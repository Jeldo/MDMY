package com.mdmy.v3.activity

import android.content.Intent
import android.location.Address
import android.location.Geocoder
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.view.View.VISIBLE
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
    private var mLat : Double = 0.0
    private var mLng : Double = 0.0
    private var mPlaceKeyword: String = ""
    private var mToken:String? =""
    private var mLocationName:String? =""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)
        initViews()
    }

    private fun initViews() {
        if(intent.hasExtra("token")) {
            mToken = intent.getStringExtra("token")
        }

        BottomSheetBehavior.STATE_EXPANDED

        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.layout_map) as SupportMapFragment?
        mapFragment!!.getMapAsync(this)

        btn_start_location.setOnClickListener {
            val sheetBehavior = BottomSheetBehavior.from(bottomSheet)
            appbar.visibility = VISIBLE
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
                    mPlaceKeyword = et_search_box.text.toString()
                    searchPlaces()
                }
                override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                }
                override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                }
            })
        }

        btn_search.setOnClickListener {
            mPlaceKeyword = et_search_box.text.toString()
            searchPlaces()
        }

        btn_submit.setOnClickListener{
            val intent = Intent(this, UserInfoActivity::class.java)
            intent.putExtra("token", mToken)
            intent.putExtra("Lat", mLat)
            intent.putExtra("Lng", mLng)
            intent.putExtra("locationName", mLocationName)
            startActivity(intent)
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
        val TITLE = "search result"
        val ZOOM_LEVEL = 15f
        mMap = googleMap
        val sheetBehavior = BottomSheetBehavior.from(bottomSheet)
        mResultAdapter =
            PlaceResultAdapter(object : PlaceResultAdapter.ResultClickListener {
                override fun resultClicked(result: String) {
                    val point = getLatLngFromAddress(result)!!
                    mLat = point.latitude
                    mLng = point.longitude
                    mLocationName = result
                    val mOptions2 = MarkerOptions()
                    mOptions2.title(TITLE)
                    mOptions2.snippet(result)
                    mOptions2.position(point)
                    sheetBehavior.state = BottomSheetBehavior.STATE_COLLAPSED
                    layout_submit.visibility = VISIBLE
                    mMap.addMarker(mOptions2)
                    mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(point, ZOOM_LEVEL))
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
                val singleAddress = addressList[0]
                LatLng(singleAddress.latitude, singleAddress.longitude)
            } else {
                null
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
