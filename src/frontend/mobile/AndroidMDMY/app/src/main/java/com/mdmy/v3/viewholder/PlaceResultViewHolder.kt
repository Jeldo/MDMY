package com.mdmy.v3.viewholder

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mdmy.v3.R

class PlaceResultViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    private val mPlaceAddress = view.findViewById<TextView>(R.id.tv_list_item)

    fun update(place: String) {
        mPlaceAddress.text = place
    }
}
