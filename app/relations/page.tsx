'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Relation {
  id: number;
  name: string;
  relation: string;
  description: string;
  achievements?: string;
  interaction?: string;
}

const relations: Relation[] = [
  {
    id: 1,
    name: '苏洵',
    relation: '父亲',
    description: '字明允，号老泉，眉山人。北宋著名文学家，与其子苏轼、苏辙并称"三苏"。',
    achievements: '以散文著称，与欧阳修、王安石等人齐名，为"唐宋八大家"之一。',
    interaction: '教导苏轼读书写字，对其文学造诣影响深远。'
  },
  {
    id: 2,
    name: '程氏',
    relation: '母亲',
    description: '眉山程家女，贤淑聪慧，深明大义。',
    interaction: '程氏重视教育，常以诗书教导子女，为苏轼打下了深厚的文学基础。不幸英年早逝，对苏轼影响深远。'
  },
  {
    id: 3,
    name: '苏辙',
    relation: '弟弟',
    description: '字子由，号颍滨遗老，眉山人。北宋著名文学家、政治家。',
    achievements: '与兄长苏轼同为"唐宋八大家"，文章风格沉稳平和。',
    interaction: '兄弟二人感情深厚，常有诗文唱和，互相支持。'
  },
  {
    id: 4,
    name: '王弗',
    relation: '发妻',
    description: '苏轼第一任妻子，青梅竹马，十九岁时与苏轼成婚。',
    interaction: '婚姻生活美满，但王弗不幸早逝，苏轼曾写《江城子·乙卯正月二十日夜记梦》怀念亡妻。'
  },
  {
    id: 5,
    name: '王闰之',
    relation: '继室',
    description: '苏轼第二任妻子，王弗的堂妹。',
    interaction: '王闰之贤惠聪慧，善解人意，与苏轼琴瑟和谐，相伴多年。'
  },
  {
    id: 6,
    name: '朝云',
    relation: '侍妾',
    description: '原为歌妓，后随侍苏轼。',
    interaction: '朝云聪慧多才，能诗善画，深得苏轼喜爱。苏轼贬谪黄州期间，朝云不离不弃，相伴左右。'
  },
  {
    id: 7,
    name: '黄庭坚',
    relation: '挚友',
    description: '字鲁直，号山谷道人，江西修水人。北宋著名文学家。',
    achievements: '诗文书法皆有成就，与苏轼、秦观、晁补之并称"宋代四大家"。',
    interaction: '与苏轼交情深厚，常有诗文唱和，互相欣赏对方的才学。'
  },
  {
    id: 8,
    name: '米芾',
    relation: '挚友',
    description: '字元章，号海岳，书画家、文学家。',
    achievements: '以书法著称，与蔡襄、苏轼、黄庭坚并称"宋四家"。',
    interaction: '与苏轼交往密切，二人都对书法和绘画有很深的造诣。'
  },
  {
    id: 9,
    name: '佛印禅师',
    relation: '知交',
    description: '法名德诚，号佛印，江西人。北宋著名禅师。',
    interaction: '与苏轼有深厚的友谊，常有禅机对答，苏轼多次在诗文中提到与佛印的交往。'
  },
  {
    id: 10,
    name: '文与可',
    relation: '挚友',
    description: '名同，字与可，眉州人。画家、文学家。',
    achievements: '以画竹著称，被誉为"竹画大家"。',
    interaction: '苏轼曾作《文与可画筼筜谷偃竹记》赞誉其画竹技艺，两人常有诗文往来。'
  },
  {
    id: 11,
    name: '欧阳修',
    relation: '座师',
    description: '字永叔，号醉翁，吉州永丰人。北宋文学家、政治家。',
    achievements: '"唐宋八大家"之一，政治上主张改革，文学上提倡"以诗文为戏"。',
    interaction: '是苏轼的座师，对其仕途和文学创作都有重要影响。欧阳修赏识苏轼的才华，多方提携。'
  },
  {
    id: 12,
    name: '苏过',
    relation: '长子',
    description: '字邓州，号澹庵。',
    achievements: '工诗善文，有《澹庵集》传世。',
    interaction: '苏轼十分疼爱这个长子，常有诗文唱和，也对其寄予厚望。'
  }
];

// Custom node styles
const nodeStyles = {
  center: {
    background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    width: 180,
    height: 180,
    borderRadius: '50%',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(59, 130, 246, 0.5)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '1.2',
  },
  family: {
    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    width: 140,
    height: 140,
    padding: '15px 10px',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(239, 68, 68, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '1.4',
    transform: 'rotate(-5deg)',
  },
  friend: {
    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    width: 130,
    height: 130,
    padding: '15px 10px',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '1.4',
    transform: 'rotate(3deg)',
  },
  mentor: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    width: 150,
    height: 150,
    padding: '15px 10px',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(139, 92, 246, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '1.4',
    transform: 'rotate(-2deg)',
  },
};

// Custom node hover styles
const nodeHoverStyles = {
  center: {
    // transform: 'scale(1.05)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(59, 130, 246, 0.6)',
  },
  family: {
    // transform: 'scale(1.05) rotate(-5deg)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 15px rgba(239, 68, 68, 0.4)',
  },
  friend: {
    // transform: 'scale(1.05) rotate(3deg)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 15px rgba(16, 185, 129, 0.4)',
  },
  mentor: {
    // transform: 'scale(1.05) rotate(-2deg)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 15px rgba(139, 92, 246, 0.4)',
  },
};

// Create nodes and edges for the graph
const initialNodes: Node[] = [
  // Center node (Su Dongpo)
  {
    id: 'sudongpo',
    position: { x: 600, y: 400 },
    data: { 
      label: '苏东坡\n(苏轼)',
      type: 'center'
    },
  },
  // Family nodes - arranged in a circular pattern
  {
    id: 'suxun',
    position: { x: 300, y: 200 },
    data: { 
      label: '苏洵\n(父亲)',
      type: 'family'
    },
    type:'center',
  },
  {
    id: 'chengshi',
    position: { x: 600, y: 150 },
    data: { 
      label: '程氏\n(母亲)',
      type: 'family'
    },
  },
  {
    id: 'suzhe',
    position: { x: 900, y: 200 },
    data: { 
      label: '苏辙\n(弟弟)',
      type: 'family'
    },
  },
  {
    id: 'wangfu',
    position: { x: 300, y: 600 },
    data: { 
      label: '王弗\n(发妻)',
      type: 'family'
    },
  },
  {
    id: 'wangrunzhi',
    position: { x: 600, y: 650 },
    data: { 
      label: '王闰之\n(继室)',
      type: 'family'
    },
  },
  {
    id: 'chaoyun',
    position: { x: 900, y: 600 },
    data: { 
      label: '朝云\n(侍妾)',
      type: 'family'
    },
  },
  {
    id: 'suguo',
    position: { x: 1050, y: 400 },
    data: { 
      label: '苏过\n(长子)',
      type: 'family'
    },
  },
  // Friend nodes - arranged on the left side
  {
    id: 'huangtingjian',
    position: { x: 150, y: 300 },
    data: { 
      label: '黄庭坚\n(挚友)',
      type: 'friend'
    },
  },
  {
    id: 'mifu',
    position: { x: 150, y: 400 },
    data: { 
      label: '米芾\n(挚友)',
      type: 'friend'
    },
  },
  {
    id: 'foyin',
    position: { x: 150, y: 500 },
    data: { 
      label: '佛印\n(知交)',
      type: 'friend'
    },
  },
  {
    id: 'wenyuke',
    position: { x: 1050, y: 300 },
    data: { 
      label: '文与可\n(挚友)',
      type: 'friend'
    },
  },
  // Mentor node
  {
    id: 'ouyangxiu',
    position: { x: 600, y: 50 },
    data: { 
      label: '欧阳修\n(座师)',
      type: 'mentor'
    },
  },
];

const initialEdges: Edge[] = [
  // Family connections
  { id: 'e-suxun', source: 'sudongpo', target: 'suxun', animated: true },
  { id: 'e-chengshi', source: 'sudongpo', target: 'chengshi', animated: true },
  { id: 'e-suzhe', source: 'sudongpo', target: 'suzhe', animated: true },
  { id: 'e-wangfu', source: 'sudongpo', target: 'wangfu', animated: true },
  { id: 'e-wangrunzhi', source: 'sudongpo', target: 'wangrunzhi', animated: true },
  { id: 'e-chaoyun', source: 'sudongpo', target: 'chaoyun', animated: true },
  { id: 'e-suguo', source: 'sudongpo', target: 'suguo', animated: true },
  // Friend connections
  { id: 'e-huangtingjian', source: 'sudongpo', target: 'huangtingjian' },
  { id: 'e-mifu', source: 'sudongpo', target: 'mifu' },
  { id: 'e-foyin', source: 'sudongpo', target: 'foyin' },
  { id: 'e-wenyuke', source: 'sudongpo', target: 'wenyuke' },
  // Mentor connection
  { id: 'e-ouyangxiu', source: 'sudongpo', target: 'ouyangxiu' },
];

export default function Relations() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<{
    relation: Relation;
    position: { x: number; y: number; transform: string };
  } | null>(null);

  // Reference to the details box
  const detailsBoxRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((rect: DOMRect) => {
    const padding = 20; // Padding from viewport edges
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Default position (right of the node)
    let x = rect.right + 10;
    let y = rect.top;
    let transform = 'translateY(-50%)';
    
    // If we have a reference to the details box, use its dimensions
    if (detailsBoxRef.current) {
      const boxRect = detailsBoxRef.current.getBoundingClientRect();
      const boxWidth = boxRect.width;
      const boxHeight = boxRect.height;
      
      // Check right edge
      if (x + boxWidth + padding > viewportWidth) {
        // Place on the left side of the node instead
        x = rect.left - boxWidth - 10;
      }
      
      // Check vertical bounds
      const halfHeight = boxHeight / 2;
      if (y - halfHeight < padding) {
        // Too close to top
        y = padding;
        transform = 'translateY(0)';
      } else if (y + halfHeight > viewportHeight - padding) {
        // Too close to bottom
        y = viewportHeight - boxHeight - padding;
        transform = 'translateY(0)';
      }
    }
    
    return { x, y, transform };
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const relation = relations.find(r => r.name === node.data.label.split('\n')[0]);
    if (relation) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const { x, y, transform } = calculatePosition(rect);
      setSelectedNode({
        relation,
        position: { x, y, transform },
      });
    }
  }, [calculatePosition]);

  // Recalculate position on window resize
  useEffect(() => {
    if (!selectedNode) return;

    const handleResize = () => {
      const nodeElement = document.querySelector(`[data-id="${selectedNode.relation.id}"]`);
      if (nodeElement) {
        const rect = nodeElement.getBoundingClientRect();
        const { x, y, transform } = calculatePosition(rect);
        setSelectedNode(prev => prev ? {
          ...prev,
          position: { x, y, transform }
        } : null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedNode, calculatePosition]);

  // Close detail box when clicking outside
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Add hover effect handler
  const onNodeMouseEnter = useCallback((event: React.MouseEvent, node: Node) => {
    const type = node.data.type as keyof typeof nodeHoverStyles;
    if (type && nodeHoverStyles[type]) {
      const element = event.target as HTMLElement;
      Object.assign(element.style, nodeHoverStyles[type]);
    }
  }, []);

  const onNodeMouseLeave = useCallback((event: React.MouseEvent, node: Node) => {
    const type = node.data.type as keyof typeof nodeStyles;
    if (type && nodeStyles[type]) {
      const element = event.target as HTMLElement;
      Object.assign(element.style, nodeStyles[type]);
    }
  }, []);

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

      {/* Header */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/"
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-white text-center">亲朋关系图</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-20 right-4 bg-white/90 p-4 rounded-lg shadow-lg z-10">
        <h3 className="font-bold mb-2">图例</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: nodeStyles.center.background }} />
            <span>苏东坡</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: nodeStyles.family.background }} />
            <span>家人</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: nodeStyles.friend.background }} />
            <span>朋友</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: nodeStyles.mentor.background }} />
            <span>师长</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">点击节点查看详情</p>
      </div>

      {/* Details Box */}
      {selectedNode && (
        <div 
          ref={detailsBoxRef}
          className="fixed bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg z-20 max-w-md transition-all duration-200"
          style={{
            left: selectedNode.position.x,
            top: selectedNode.position.y,
            transform: selectedNode.position.transform,
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedNode.relation.name}
            </h2>
            <span className="px-2 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
              {selectedNode.relation.relation}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {selectedNode.relation.description}
          </p>
          {selectedNode.relation.achievements && (
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <span className="font-semibold">主要成就：</span>
              {selectedNode.relation.achievements}
            </p>
          )}
          {selectedNode.relation.interaction && (
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">与东坡交往：</span>
              {selectedNode.relation.interaction}
            </p>
          )}
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Graph */}
      <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ 
            padding: 0.2,
            minZoom: 0.5,
            maxZoom: 1.5
          }}
          minZoom={0.5}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background 
            color="#333"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              const type = node.data?.type || 'default';
              switch (type) {
                case 'center': return '#3b82f6';
                case 'family': return '#ef4444';
                case 'friend': return '#10b981';
                case 'mentor': return '#8b5cf6';
                default: return '#888';
              }
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
