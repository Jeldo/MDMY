package com.mdmy.v3.activity

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View.VISIBLE
import androidx.appcompat.app.AppCompatActivity
import com.apollographql.apollo.rx2.rxMutate
import com.mdmy.v3.CreateMeetingMutation
import com.mdmy.v3.R
import com.mdmy.v3.network.ApolloService.Companion.apolloClient
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_create_meeting.*

class CreateMeetingActivity : AppCompatActivity() {

    private var meetingName: String = ""
    private var numberOfParticipants: Int? = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_meeting)

        initViews()
    }

    private fun initViews() {
        btn_create_meeting.setOnClickListener {
            if (et_meeting_name.text.toString() == "") {
                tv_meeting_name_err.visibility = VISIBLE
                return@setOnClickListener
            }
            meetingName = et_meeting_name.text.toString()
            numberOfParticipants = et_number_of_participant.text.toString().toIntOrNull()
            if (numberOfParticipants == null || numberOfParticipants!! < 2) {
                tv_number_of_participant_err.visibility = VISIBLE
                return@setOnClickListener
            }
            val createMeetingMutation: CreateMeetingMutation =
                CreateMeetingMutation.builder().meetingName(meetingName)
                    .numberOfParticipants(numberOfParticipants!!)
                    .build()

            apolloClient.rxMutate(createMeetingMutation)
                //TODO(YoungHwan): Add error handling code
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