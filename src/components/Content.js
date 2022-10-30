import React from 'react'
import '../styles/content.css';
import Images from './Images';
import UserPerGame from './UserPerGame';

export default function Content({categories, skill}) {

  return (
    <main className='main-content'>
      <Images categories={categories} />

      {
        categories.map(item => 
          {
            let temp = skill.filter(s => s.categoryName === item.categoryName)
           return (<UserPerGame data={temp} categoryName = {item.categoryName}/>)
          }
        )
      }
    </main>
  )
}
