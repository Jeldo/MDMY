package com.mdmy.v3.activity

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View.VISIBLE
import android.view.View.GONE
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

    private fun isValidForm(): Boolean {
        var isValid = true
        meetingName = et_meeting_name.text.toString()
        if (meetingName.isEmpty()) {
            tv_meeting_name_err.visibility = VISIBLE
            isValid = false
        } else {
            tv_meeting_name_err.visibility = GONE
        }
        numberOfParticipants = et_number_of_participant.text.toString().toIntOrNull()
        if (numberOfParticipants == null || numberOfParticipants!! < 2) {
            tv_number_of_participant_err.visibility = VISIBLE
            isValid = false
        } else {
            tv_number_of_participant_err.visibility = GONE
        }
        return isValid
    }

    private fun initViews() {
        btn_create_meeting.setOnClickListener {
            if (isValidForm()) {
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
                            intent.putExtra("token", it.data()?.createMeeting()?.token())
                            startActivity(intent)
                        }, {
                            Log.e("ERR", it.message.toString())
                        }
                    )
            }
        }
    }
}

