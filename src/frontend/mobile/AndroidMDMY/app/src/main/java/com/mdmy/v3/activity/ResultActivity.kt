package com.mdmy.v3.activity

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.apollographql.apollo.rx2.rxMutate
import com.apollographql.apollo.rx2.rxQuery
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.mdmy.v3.GetMeetingByTokenQuery
import com.mdmy.v3.GetMeetingResultMutation
import com.mdmy.v3.R
import com.mdmy.v3.network.ApolloService.Companion.apolloClient
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import org.json.JSONObject

@Suppress("NULLABILITY_MISMATCH_BASED_ON_JAVA_ANNOTATIONS")
class ResultActivity : AppCompatActivity(), OnMapReadyCallback {
    private var mMap: GoogleMap? = null
    private var mToken: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)
        initViews()
    }

    private fun initViews() {
        if (intent.hasExtra("token")) {
            mToken = intent.getStringExtra("token")
        }
        setLatLng()
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.fragment_result_map) as SupportMapFragment?
        mapFragment!!.getMapAsync(this)
    }

    override fun onMapReady(p0: GoogleMap?) {
        mMap = p0
        setLatLng()
    }

    @SuppressLint("CheckResult")
    private fun setLatLng() {
        val getMeetingByTokenQuery: GetMeetingByTokenQuery =
            GetMeetingByTokenQuery.builder()
                .token(mToken)
                .build()

        apolloClient.rxQuery(getMeetingByTokenQuery)
            .map {
                if (intent.hasExtra("token")) {
                    mToken = intent.getStringExtra("token")
                }
                val searchPoint: MutableList<Double> = mutableListOf(0.0, 0.0)
                val participants = it.data()?.meetingByToken?.participants()
                for (participant in participants!!) {
                    searchPoint[0] += participant.location().coordinates()[0]
                    searchPoint[1] += participant.location().coordinates()[1]
                }
                searchPoint[0] = searchPoint[0] / participants.size
                searchPoint[1] = searchPoint[1] / participants.size
                return@map listOf(searchPoint[1], searchPoint[0])
            }
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                markLocation(it)
            }, {
                Log.e("ERR", it.message.toString())
            })
    }

    @SuppressLint("CheckResult")
    private fun markLocation(searchPoint: List<Double>) {
        val ZOOM_LEVEL = 15f
        val getMeetingResultMutation: GetMeetingResultMutation =
            GetMeetingResultMutation.builder()
                .token(mToken)
                .searchpoint(searchPoint)
                .build()

        apolloClient.rxMutate(getMeetingResultMutation)
            .toObservable()
            .flatMap {
                Observable.fromIterable(it.data()?.meetingResult?.result()?.candidates())
                    .map { location ->
                        val locationObject = JSONObject(location.toString())
                        val lat = locationObject.getJSONObject("location")
                            .getJSONArray("coordinates")[1] as Double
                        val lng = locationObject.getJSONObject("location")
                            .getJSONArray("coordinates")[0] as Double
                        Pair(lat, lng)
                    }
                    .subscribeOn(Schedulers.io())
            }
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                mMap?.addMarker(MarkerOptions().position(LatLng(it.first, it.second)))
                mMap?.moveCamera(
                    CameraUpdateFactory.newLatLngZoom(
                        LatLng(it.first, it.second),
                        ZOOM_LEVEL
                    )
                )
            }, {
                Log.e("ERR", it.message.toString())
            })
    }
}