import Head from 'next/Head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import React from 'react';
import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { removeCookies } from "cookies-next";

export default function Home(multas) {

  const multas2 = multas.multas.RETORNO;

  if (typeof document === 'undefined') {
    // during server evaluation
  } else {
    // during client's browser evaluation
    var cookies = parseCookies();
    if (cookies['MB']) {
      return (
      <>
        <Head>
          <title>Multas Biblioteca</title>
          <meta content="Multas" />
          <link rel="icon" href="/logo.ico" />
        </Head>

        <main className={styles.main}>
          <a className={styles.btnLogout} onClick={(event) => logout()}>Logout</a>
          <div>
            <h1>Lista de Multas</h1>
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
              <tbody>
                {multas2.map(multa => {
                  return <tr className={styles.listaMulta}><td>{multa.num_titulo}</td><td>{multa.ra}</td><td>{multa.nome_pessoa}</td><td>{multa.data_emprestimo}</td><td>{multa.data_multa}</td><td>{multa.valor_multa}</td><td>{multa.flag_transporte}</td><td><button onClick={(event) => alteraMulta(multa, event)}>Baixar</button></td></tr>
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
    } else {
      Router.push(process.env.BASEURL + "login")
      return (
        <Head>
          opa
        </Head>
      );

    }
  }

}

const logout = (a, b) => {
  window.location.reload(); //alterar
  //removeCookies("MB");
  //Router.push(process.env.BASEURL)
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

async function baixaMulta(item) {
  await axios.post(process.env.BACKEND + 'AlteraStatus', {
    'COD': item
  })
  console.log("Removeu multa " + item);
}

export async function getServerSideProps(context) {
  var multas = await axios.get(process.env.BACKEND + 'Lista')

  multas = multas.data

  return {
    props: { multas }, // will be passed to the page component as props
  }
}
