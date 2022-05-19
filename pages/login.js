import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import {setCookie} from 'nookies'

export default function Home(multas) {
  const { register, handleSubmit } = useForm()
  const [login, setLogin] = useState()
  const [passord, setPassord] = useState()

  return (
    <div>
      <Head>
        <title>Multas Biblioteca</title>
        <meta content="Multas" />
        <link rel="icon" href="/logo.ico" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </Head>

      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h1 className={styles.tituloLogin}>login</h1>
          <span className={styles.descricaoLogin}>Sitema de multas</span>
          <form onSubmit={handleSubmit(Login)}>
            <div>
              <label className={styles.labelLogin}>Usuario: </label>
              <br />
              <input type="text" name="login" {...register("login")} className={styles.inputLogin} autoComplete="username" required></input>
            </div>
            <div>
              <label className={styles.labelLogin}>Senha: </label>
              <br />
              <input type="password" name="password" {...register("password")} className={styles.inputLogin} autoComplete="current-password" required></input>
            </div>
            <span id="erro" className={styles.erro}></span>
            <button type="submit" className={styles.btnLogin}>ENTRAR</button>
          </form>
        </div>
      </main >

      <footer className={styles.footer}>
        NIU
      </footer>
    </div >
  )
}

async function Login(user) {
  console.log(user)
  //const retorno = await axios.post('http://api.uniplaclages.edu.br:4448/Login', {
  //  'login': nome,
  //  'password':senha
  //})
  //if(retorno.data.entry === 1){
  //  console.log("Logado")
  //  setCookie(null, 'MB', retorno.data.key, {
  //    maxAge: 60 * 60,
  //    path: '/',
  //  });
  //  Router.push("/ola")
  //}else{
  //  var msg = document.getElementById("erro");
  //  msg.innerHTML = "Usuario ou senha iválido"
  //}
}
