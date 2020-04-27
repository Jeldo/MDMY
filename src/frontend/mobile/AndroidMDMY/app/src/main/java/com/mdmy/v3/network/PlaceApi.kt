package com.mdmy.v3.network

import android.util.Log
import com.mdmy.v3.BuildConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONException
import org.json.JSONObject
import java.io.IOException
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.MalformedURLException
import java.net.URL
import java.util.*


@Suppress("NULLABILITY_MISMATCH_BASED_ON_JAVA_ANNOTATIONS")
object PlaceApi {
    suspend fun autoComplete(input: String): ArrayList<String?> {
        val arrayList: ArrayList<String?> = ArrayList<String?>()
        val BASE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
        val BUFFER_SIZE = 1024
        withContext(Dispatchers.IO) {
            var connection: HttpURLConnection? = null
            val jsonResult = StringBuilder()
            try {
                val sb =
                    StringBuilder(BASE_URL)
                sb.append(input).append("&key=").append(BuildConfig.PLACE_KEY)
                val url = URL(sb.toString())
                connection = url.openConnection() as HttpURLConnection?
                val inputStreamReader =
                    InputStreamReader(connection?.inputStream)
                var read: Int
                val buff = CharArray(BUFFER_SIZE)
                while (inputStreamReader.read(buff).also { read = it } != -1) {
                    jsonResult.append(buff, 0, read)
                }
            } catch (e: MalformedURLException) {
                e.printStackTrace()
            } catch (e: IOException) {
                e.printStackTrace()
            } finally {
                connection?.disconnect()
            }
            try {
                val jsonObject = JSONObject(jsonResult.toString())
                val prediction = jsonObject.getJSONArray("predictions")
                for (i in 0 until prediction.length()) {
                    arrayList.add(prediction.getJSONObject(i).getString("description"))
                }
            } catch (e: JSONException) {
                e.printStackTrace()
            }
        }
        return arrayList
    }
}