import { useRef } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'

import AvatarBlue from '../../assets/images/avatar-blue.png'

import { MAX_TWEET_CHAR } from '../../constants/index'

export const TweetForm = ({ loggedInUser, onSuccess }) => {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        data: {
          text: values.text
        },
        headers: {
          'authorization': `Bearer ${loggedInUser.accessToken}`,
        }
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: '',
    }
  })

  const sendTweetButton = useRef()

  const handleEnter = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      sendTweetButton.current.click()
    }
  }

  return (
    <div className="border-b border-silver p-4 space-y-8">
      <div className="flex space-x-7">
        <img src={AvatarBlue} className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className="pl-14 text-lg flex flex-col space-y-2" onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          value={formik.values.text}
          className="bg-transparent outline-none resize-none disabled:opacity-50"
          placeholder="O que está acontencendo?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onKeyDown={handleEnter}
          disabled={formik.isSubmitting}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            type="submit"
            ref={sendTweetButton}
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={
              formik.values.text.length > MAX_TWEET_CHAR ||
              formik.isSubmitting
            }
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  )
}