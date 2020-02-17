package com.mdmy.v3.activity

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.mdmy.v3.R
import kotlinx.android.synthetic.main.activity_make_room.*

class MakeRoomActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_make_room)

        mkroom_btn.setOnClickListener{
            val intent = Intent(this, MapActivity::class.java)
            startActivity(intent)

        }
    }
}
