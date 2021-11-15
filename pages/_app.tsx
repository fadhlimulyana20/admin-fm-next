import '../styles/globals.css'
import '../styles/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app'
import React, { useContext, useEffect, useState } from 'react';
import Store, { Context } from '../contexts/store';
import { User } from '../contexts/types';
import { useRouter } from 'next/dist/client/router';
import axios, { AxiosResponse } from 'axios';
import { JsonResponse } from './api/global';
import { backendUrl } from '../components/prefix/backend';
import Cookies from 'js-cookie'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  )
}

export default MyApp
