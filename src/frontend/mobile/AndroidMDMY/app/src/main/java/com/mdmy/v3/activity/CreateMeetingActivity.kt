package com.mdmy.v3.activity

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.mdmy.v3.R
import kotlinx.android.synthetic.main.activity_create_room.*

class CreateMeetingActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_room)
        btn_makeroom.setOnClickListener {
            val intent = Intent(this, MapActivity::class.java)
            startActivity(intent)
        }
    }
}
