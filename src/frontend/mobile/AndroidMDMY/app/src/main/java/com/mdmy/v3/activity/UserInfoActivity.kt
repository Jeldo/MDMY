package com.mdmy.v3.activity

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.apollographql.apollo.rx2.rxMutate
import com.apollographql.apollo.rx2.rxQuery
import com.mdmy.v3.CreateParticipantMutation
import com.mdmy.v3.GetMeetingByTokenQuery
import com.mdmy.v3.R
import com.mdmy.v3.network.ApolloService
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_user_info.*

@Suppress("NULLABILITY_MISMATCH_BASED_ON_JAVA_ANNOTATIONS")
class UserInfoActivity : AppCompatActivity() {
    private var mToken: String = ""
    private var mLatLng: MutableList<Double> = mutableListOf()
    private var mTransportation: String = ""
    private var mLocationName: String = ""

    @SuppressLint("CheckResult")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user_info)
        initViews()
    }

    private fun initViews() {
        if (intent.hasExtra("token")) {
            mToken = intent.getStringExtra("token")
        }
        if (intent.hasExtra("locationName")) {
            mLocationName = intent.getStringExtra("locationName")
        }
        if (intent.hasExtra("Lat")) {
            mLatLng.add(intent.getDoubleExtra("Lat", 0.0))
        }
        if (intent.hasExtra("Lng")) {
            mLatLng.add(intent.getDoubleExtra("Lng", 0.0))
        }

        btn_submit_info.setOnClickListener {
            val createParticipantMutation: CreateParticipantMutation =
                CreateParticipantMutation.builder()
                    .participantName(et_name.text.toString())
                    .transportation(mTransportation)
                    .token(mToken)
                    .locationName(mLocationName)
                    .location(mLatLng)
                    .build()

            ApolloService.apolloClient.rxMutate(createParticipantMutation)
                .subscribeOn(Schedulers.io()).subscribe(
                    {
                        // TODO(YoungHwan): Add response handling code
                        checkNumberOfParticipants()
                    }, {
                        Log.e("ERR", it.toString())
                    }
                )
        }

        rg_transportation.setOnCheckedChangeListener { _, checkedId ->
            if (checkedId == R.id.radio_car) {
                mTransportation = "driving"
            } else mTransportation = "public"
        }
    }

    @SuppressLint("CheckResult")
    fun checkNumberOfParticipants() {
        var isFull = false
        val getMeetingByTokenQuery: GetMeetingByTokenQuery =
            GetMeetingByTokenQuery.builder()
                .token(mToken)
                .build()

        ApolloService.apolloClient.rxQuery(getMeetingByTokenQuery)
            .map {
                if (it.data()?.meetingByToken?.numberOfParticipants()!!.toInt()
                    == it.data()?.meetingByToken?.participants()?.size!!.toInt()
                ) {
                    isFull = true
                }
                return@map isFull
            }
            .subscribeOn(Schedulers.io()).subscribe(
                {
                    if (isFull) {
                        val intent = Intent(this, ResultActivity::class.java)
                        intent.putExtra("token", mToken)
                        startActivity(intent)
                    } else {
                        val intent = Intent(this, MapActivity::class.java)
                        intent.putExtra("token", mToken)
                        startActivity(intent)
                    }
                }, {
                    Log.e("ERR", it.message.toString())
                }
            )
    }
}
