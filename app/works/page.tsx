'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Work {
  id: number;
  type: '诗' | '词' | '文';
  title: string;
  content: string;
  description: string;
}

const works: Work[] = [
  {
    id: 1,
    type: '词',
    title: '水调歌头·明月几时有',
    content: `丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。
明月几时有？把酒问青天。
不知天上宫阙，今夕是何年。
我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
起舞弄清影，何似在人间。

转朱阁，低绮户，照无眠。
不应有恨，何事长向别时圆？
人有悲欢离合，月有阴晴圆缺，此事古难全。
但愿人长久，千里共婵娟。`,
    description: '这首词作于苏轼47岁时的中秋之夜，是一首著名的抒情词。词中表达了对弟弟苏辙的思念之情，以及对人生聚散无常的感慨。'
  },
  {
    id: 2,
    type: '诗',
    title: '题西林壁',
    content: `横看成岭侧成峰，
远近高低各不同。
不识庐山真面目，
只缘身在此山中。`,
    description: '这首诗写于苏轼游览庐山西林寺时，描述了庐山变幻莫测的景色，蕴含着深刻的哲理。'
  },
  {
    id: 3,
    type: '词',
    title: '江城子·密州出猎',
    content: `老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。
为报倾城随太守，亲射虎，看孙郎。
酒酣胸胆尚开张，鬓微霜，又何妨？
持节云中，何日遣冯唐？
会挽雕弓如满月，西北望，射天狼。`,
    description: '这首词写于苏轼任密州知州时出猎的情景，展现了作者豪迈奔放的个性和远大的抱负。'
  },
  {
    id: 4,
    type: '文',
    title: '前赤壁赋',
    content: `壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然...`,
    description: '这是一篇描写赤壁游览的散文，以优美的文字描绘了月夜泛舟的景色，抒发了对人生短暂的感慨。'
  }
];

export default function Works() {
  const [selectedType, setSelectedType] = useState<'全部' | '诗' | '词' | '文'>('全部');

  const filteredWorks = selectedType === '全部' 
    ? works 
    : works.filter(work => work.type === selectedType);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Chinese landscape background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-white text-center">苏东坡作品集</h1>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {(['全部', '诗', '词', '文'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedType === type
                  ? 'bg-white text-gray-900'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {work.title}
                </h2>
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                  {work.type}
                </span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-[inherit] mb-4">
                {work.content}
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
