package com.mdmy.v3.activity

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.View.VISIBLE
import android.widget.Toast
import androidx.annotation.IntegerRes
import androidx.appcompat.app.AppCompatActivity
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.rx2.rxMutate
import com.mdmy.v3.CreateMeetingMutation
import com.mdmy.v3.R
import com.mdmy.v3.network.ApolloService.Companion.apolloClient
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_create_room.*

class CreateMeetingActivity : AppCompatActivity() {

    private var meetingName: String = ""
    private var numberOfMeetingUser: Int? = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_room)

        initViews()
    }

    private fun initViews() {
        btn_makeroom.setOnClickListener {
            if (et_meeting_name.text.toString() == "") {
                tv_meeting_name_err.visibility = VISIBLE
                return@setOnClickListener
            }
            try {
                numberOfMeetingUser = et_participants_num.text.toString().toInt()
            } catch (e: NumberFormatException) {
                tv_participants_num_err.visibility = VISIBLE
            }
            if (numberOfMeetingUser!! < 2) {
                tv_participants_num_err.visibility = VISIBLE
                return@setOnClickListener
            }
            meetingName = et_meeting_name.text.toString()

            val createMeetingMutation: CreateMeetingMutation =
                CreateMeetingMutation.builder().meetingName(meetingName)
                    .numberOfParticipants(numberOfMeetingUser!!)
                    .build()

            apolloClient.rxMutate(createMeetingMutation)
                .subscribeOn(Schedulers.io()).subscribe(
                    {
                        Log.e("RES", it.data().toString())
                        val intent = Intent(this, MapActivity::class.java)
                        startActivity(intent)
                    }, {
                        Log.e("ERR", it.message.toString())
                    }
                )
        }
    }
}

