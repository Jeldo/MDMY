package com.mdmy.v3.activity

import android.location.Address
import android.location.Geocoder
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.mdmy.v3.R
import com.mdmy.v3.adapter.PlaceResultAdapter
import com.mdmy.v3.network.PlaceApi
import kotlinx.android.synthetic.main.activity_map.*
import kotlinx.android.synthetic.main.bottom_sheet.*
import kotlinx.coroutines.launch

class MapActivity : AppCompatActivity(), OnMapReadyCallback {
    private lateinit var mResultList: RecyclerView
    private lateinit var mResultAdapter: PlaceResultAdapter
    private lateinit var mMap: GoogleMap
    private var mPlaceKeyword: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)
        initViews()
    }

    private fun initViews() {
        BottomSheetBehavior.STATE_EXPANDED
        val sheetBehavior = BottomSheetBehavior.from(bottomSheet)

        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.layout_map) as SupportMapFragment?
        mapFragment!!.getMapAsync(this)

        btn_start_location.setOnClickListener {
            appbar.visibility = View.VISIBLE
            layout_start_location.visibility = View.INVISIBLE
            sheetBehavior.state = BottomSheetBehavior.STATE_EXPANDED
        }

        findViewById<EditText>(R.id.et_search_box).run {
            setOnEditorActionListener { _, action, _ ->
                when (action) {
                    EditorInfo.IME_ACTION_SEARCH -> {
                        searchPlaces()
                        true
                    }
                    else -> false
                }
            }

            addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(p0: Editable?) {
                    mPlaceKeyword = p0?.toString() ?: ""
                }
                override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                }
                override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                }
            })
        }

        btn_serach.setOnClickListener {
            mPlaceKeyword = et_search_box.text.toString()
            searchPlaces()
        }
    }

    private fun searchPlaces() {
        if (mPlaceKeyword.isNotBlank()) {
            lifecycleScope.launch {
                val result = PlaceApi.autoComplete(mPlaceKeyword)
                mResultAdapter.setResult(result.filterNotNull())
            }
        }
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mResultAdapter =
            PlaceResultAdapter(object : PlaceResultAdapter.ResultClickListener {
                override fun resultClicked(result: String) {
                    val point: LatLng = getLatLngFromAddress(result)!!
                    val mOptions2 = MarkerOptions()
                    mOptions2.title("search result")
                    mOptions2.snippet(result)
                    mOptions2.position(point)
                    mMap.addMarker(mOptions2)
                    mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(point, 15f))
                }
            })
        mResultList = findViewById<RecyclerView>(R.id.rv_list_item).apply {
            layoutManager = LinearLayoutManager(context)
            adapter = mResultAdapter
        }
    }

    private fun getLatLngFromAddress(address: String): LatLng? {
        val geocoder = Geocoder(this@MapActivity)
        val addressList: List<Address>?
        return try {
            addressList = geocoder.getFromLocationName(address, 1)
            if (addressList != null) {
                val singleaddress = addressList[0]
                LatLng(singleaddress.latitude, singleaddress.longitude)
            } else {
                null
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
