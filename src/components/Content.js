import React from 'react'
import { useState } from 'react';
import '../styles/content.css';
import CategoryCard from './CategoryCard';
import SkillCard from './SkillCard';

export default function Content({ categories, skill }) {

  const [isPlay, setIsPlay] = useState(0)

  return (
    <main className='main-content pt-3'>
      <CategoryCard categories={categories} />

      {
        categories.map((item, index) => {
          let temp = skill.filter(s => s.categoryName === item.categoryName)
          return (
            <div key={index}>
              <SkillCard data={temp} isPlay = {isPlay} setIsPlay = {setIsPlay} categoryName={item.categoryName} categoryId = {item.categoryId}/>
            </div>
          )
        }
        )
      }
    </main>
  )
}
