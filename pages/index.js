import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import React from 'react';
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { removeCookies } from "cookies-next";

export default function Home(multas) {

  const multas2 = multas.multas.RETORNO;

  if (typeof document === 'undefined') {
    // during server evaluation

  } else {
    // during client's browser evaluation
    var cookies = parseCookies();
    if (cookies['MB']) {
      validacao(cookies['MB'])
    } else {
      document.getElementById("pagina").innerHTML = "<a href='login' style='text-align: center'>Sua sessão expirou<br/>clique aqui para logar novamente</a>"
      Router.push("/login")
      return (
        <Head>
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
          opa
        </Head>
      );

    }
  }
  return (
    <>
      <Head>
        <title>Multas Biblioteca</title>
        <meta content="Multas" />
        <link rel="icon" href="/logo.ico" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </Head>
      <main className={styles.main} id="pagina">
        <a className={styles.btnLogout} onClick={(event) => logout()}>Logout</a>
        <div>
          <h1>Lista de Multas da Biblioteca</h1>
          <table className={styles.tabela} id='tabela'>
            <thead>
              <tr className={styles.linha}>
                <td className={styles.coluna}>TITULO</td>
                <td className={styles.coluna}>RA</td>
                <td className={styles.coluna}>NOME</td>
                <td className={styles.coluna}>DATA EPRESTIMO</td>
                <td className={styles.coluna}>DATA MULTA</td>
                <td className={styles.coluna}>VALOR</td>
                <td className={styles.coluna}>FLAG</td>
              </tr>
            </thead>
            <tbody id="tbody">
              {multas2.map(multa => {
                return <tr className={styles.listaMulta}><td>{multa.num_titulo}</td><td>{multa.ra}</td><td className={styles.nomePessoa}>{multa.nome_pessoa}</td><td>{multa.data_emprestimo}</td><td>{multa.data_multa}</td><td>{multa.valor_multa}</td><td>{multa.flag_transporte}</td><td><button onClick={(event) => alteraMulta(multa, event)}>Baixar</button></td></tr>
              })}
            </tbody>
          </table>
        </div>
      </main>
      <footer className={styles.footer}>
        NIU
      </footer>
    </>
    );
}

const logout = (a, b) => {
  removeCookies("MB");
  Router.push("/login")
}

const alteraMulta = (a, b) => {

  var conf = confirm("Tem Certeza que deseja baixar a multa do(a) " + a.nome_pessoa);
  if (conf == true) {
    baixaMulta(a.num_titulo)
    alert(a.nome_pessoa + "Baixado com sucesso!")
    window.location.reload();
  } else {
    return
  }
}

async function validacao(cookie){
  const retorno = await axios.post('http://api.uniplaclages.edu.br:4448/Session', {
    'key': cookie
  })
  console.log(retorno.data.key)
  if(retorno.data.key === false){
    document.getElementById("pagina").innerHTML = "<a href='login' style='text-align: center'>Sua sessão expirou<br/>clique aqui para logar novamente</a>"
    removeCookies("MB");
    Router.push("/login");
  }
}

async function baixaMulta(item) {
  await axios.post('http://api.uniplaclages.edu.br:4448/AlteraStatus', {
    'COD': item
  })
  console.log("Removeu multa " + item);
}

export async function getServerSideProps(context) {
  var multas = await axios.get('http://api.uniplaclages.edu.br:4448/Lista')

  multas = multas.data

  return {
    props: { multas }, // will be passed to the page component as props
  }
}
