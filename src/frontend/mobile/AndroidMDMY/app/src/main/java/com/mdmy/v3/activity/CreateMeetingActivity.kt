package com.mdmy.v3.activity

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
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
    private var numberOfMeetingUser: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_room)

        initViews()
    }

    private fun initViews() {
        btn_makeroom.setOnClickListener {
            meetingName = et_meeting_name.text.toString() ?: ""
            numberOfMeetingUser = Integer.parseInt(et_number_of_people.text.toString()) ?: 0
            if (numberOfMeetingUser < 2) Toast.makeText(this, "2명이상 기입해주세요.", Toast.LENGTH_SHORT)
                .show()
            if (meetingName == "") Toast.makeText(this, "방이름을 기입해주세요.", Toast.LENGTH_SHORT).show()
            else {
                createMeeting(
                    apolloClient,
                    meetingName,
                    numberOfMeetingUser
                )
                val intent = Intent(this, MapActivity::class.java)
                startActivity(intent)
            }
        }
    }

    @SuppressLint("CheckResult")
    fun createMeeting(getApolloClient: ApolloClient, meetingName: String, numberOfPeople: Int) {
        val createMeetingMutation: CreateMeetingMutation =
            CreateMeetingMutation.builder().meetingName(meetingName).numberOfPeople(numberOfPeople)
                .build()

        getApolloClient.rxMutate(createMeetingMutation).subscribeOn(Schedulers.io()).subscribe(
            {
                when (it.errors()[0].toString()) {
                    "err " -> Toast.makeText(this, "네트워크를 확인해 주세요", Toast.LENGTH_SHORT).show()
                }
            }, {
                Log.e("ERR", it.message.toString())
            }
        )
    }
}
