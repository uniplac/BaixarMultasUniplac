import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import React from 'react';

export default function Home(multas) {

  const multas2 = multas.multas.RETORNO;

  return (
    <div>
      <Head>
        <title>Multas Biblioteca</title>
        <meta content="Multas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div>
        <h1>Lista de Multas</h1>
        <table className={styles.tabela}>
          <thead>
            <tr className={styles.linha}>
              <td >TITULO</td>
              <td >RA</td>
              <td>NOME</td>
              <td >DATA EPRESTIMO</td>
              <td >DATA MULTA</td>
              <td >VALOR</td>
              <td >FLAG</td>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.linha}>
              <td >TITULO</td>
              <td >RA</td>
              <td>NOME</td>
              <td >DATA EPRESTIMO</td>
              <td >DATA MULTA</td>
              <td >VALOR</td>
              <td >FLAG</td>
            </tr>
          </tbody>
        </table>
      </div>

      </main>

      <footer className={styles.footer}>
        NIU
      </footer>
    </div>
  )
  }

  const alteraMulta = (a, b) => {
    
    var conf = confirm("Tem Certeza que deseja baixar a multa do(a) " + a.nome_pessoa);
    if(conf == true){
      baixaMulta(a.num_titulo)
      alert(a.nome_pessoa + "Baixado com sucesso!")
      window.location.reload();
    }else{
      return
    }
  }

  async function baixaMulta(item){
    await axios.post('http://localhost:4448/AlteraStatus', {
      'COD': item
    })
    console.log("Removeu multa " + item);
  }

  export async function getServerSideProps(context) {
    var multas = await axios.get('http://localhost:4448/Lista')
    
    multas = multas.data
  
    return {
      props: {multas}, // will be passed to the page component as props
    }
  }
