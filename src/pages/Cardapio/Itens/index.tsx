import styles from './itens.module.scss';
import cardapio from './itens.json';
import Item from './Item';
import { useEffect, useState } from 'react';

interface IProps {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export default function Itens(props: IProps){
  const [ lista, setlista ] = useState(cardapio);  
  const { busca, filtro, ordenador } = props;

  function testaBusca(title: string) {
    const regex = new RegExp(busca, 'i');
    return regex.test(title);
  }

  function testaFiltro(id: number) {
    if(filtro !== null)
      return filtro === id;
    return true;
  }

  function ordenar(novalista: typeof cardapio) {
    switch (ordenador) {
      case 'porcao':
        return ordenarPropriedadeCrescente(novalista, 'size');
      case 'qtd_pessoas':
        return ordenarPropriedadeCrescente(novalista, 'serving');
      case 'preco':
        return ordenarPropriedadeCrescente(novalista, 'price');
      default:
        return novalista;
    }
  }

  const ordenarPropriedadeCrescente = (
    newlista: typeof cardapio,
    propriedade: 'size' | 'serving' | 'price'
  ) => {
    return newlista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  };

  useEffect(() => {
    const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id));
    setlista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);
  
  return(
    <div
      className={styles.itens}
    >
      {
        lista.map((item) => (
          <Item 
            key={item.id}
            { ...item }
          />          
        ))
      }
    </div>
  );
}