package com.mdmy.v3.network

import android.annotation.SuppressLint
import android.util.Log
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.rx2.rxMutate
import io.reactivex.schedulers.Schedulers
import okhttp3.OkHttpClient

class ApolloService {

    private val baseURL = "http://192.168.0.24:8000/graphql"

    companion object {
        var apolloClient: ApolloClient = ApolloService().getApolloClient()
    }

    fun getApolloClient(): ApolloClient {
        val okHttpClient = OkHttpClient.Builder().build()
        return ApolloClient.builder().serverUrl(baseURL)
            .okHttpClient(okHttpClient).build()
    }

//    @SuppressLint("CheckResult")
//    fun deleteMeeting(apolloClient: ApolloClient, id: String) {
//        val deleteMeetingMutation: DeleteMeetingMutation =
//            DeleteMeetingMutation.builder().id(id).build()
//
//        apolloClient.rxMutate(deleteMeetingMutation).subscribeOn(Schedulers.io()).subscribe(
//            { Log.e("Response", it.data().toString()) },
//            {
//                Log.e("ERR", it.message.toString())
//            }
//        )
//    }
}