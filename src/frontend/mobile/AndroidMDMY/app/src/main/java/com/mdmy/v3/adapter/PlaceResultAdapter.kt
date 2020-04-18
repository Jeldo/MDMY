package com.mdmy.v3.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.mdmy.v3.R
import com.mdmy.v3.viewholder.PlaceResultViewHolder

class PlaceResultAdapter(private val resultClickListener: ResultClickListener) :
    RecyclerView.Adapter<PlaceResultViewHolder>() {
    private val mResultList = mutableListOf<String>()

    interface ResultClickListener {
        fun resultClicked(result: String)
    }

    fun setResult(resultList: List<String>) {
        synchronized(mResultList) {
            mResultList.clear()
            mResultList.addAll(resultList)
        }

        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlaceResultViewHolder {
        return PlaceResultViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.map_rv_item, parent, false)
        )
    }

    override fun getItemCount(): Int {
        return mResultList.size
    }

    override fun onBindViewHolder(holder: PlaceResultViewHolder, position: Int) {
        (holder as? PlaceResultViewHolder)?.run {
            val result = mResultList[position]
            update(result)

            itemView.setOnClickListener {
                resultClickListener.resultClicked(result)
            }
        }
    }
}

