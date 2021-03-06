/*队列*/
function Queue(){
    let item = [];
    //向队列尾部添加元素
    this.enqueue = function(){
        item.push.apply(item, arguments);
    }
    //移除队列第一个元素并返回第一个元素
    this.dequeue = function(){
        return item.shift();
    }
    //返回队列第一个元素，队列不做处理
    this.front = function(){
        return item[0];
    }
    //如果队列不包含任何元素则返回true，反之false
    this.isEmpty = function(){
        return item.length === 0;
    }
    //返回队列的长度
    this.size = function(){
        return item.length;
    }
    //清空队列
    this.clear = function(){
        item = [];
    }
    //打印队列元素
    this.print = function(){
        console.info(item);
    }
}

/*字典*/
function Dictionary(){
	let items = {};
	//向字典中设置元素
	this.set = function(key, value){
		items[key] = value;
	}
	//判断字典中是否存在某个键
	this.has = function(key){
		return key in items;
	}
	//移除字典中相应的元素
	this.remove = function(key){
		let flag = false;
		if(this.has(key)){
			delete items[key];
		}
		return flag;
	}
	//通过键查找值
	this.get = function(key){
		return this.has(key) ? items[key] : undefined;
	}
	//以数组的形式返回字典中所有values实例的值
	this.values = function(){
		return Object.values(items);
	}
	//清空字典
	this.clear = function(){
		items = {};
	}
	//获取字典的元素个数
    this.size = function(){
        return Object.keys(items).length;
    }
	//获取字典
	this.getItems = function(){
		return items;
	}
}

/**
 * 实现图 Graph
 */
function Graph(){
	let vertices = [];
	let adjList = new Dictionary();	//字典类
	/**
	 * 向图中添加新的顶点
	 * @params v 顶点名称
	 * 将该顶点添加到顶点列表中，并且在邻接表中，设置顶点v作为键对应的字典值为一个空数组
	 */
	this.addVertex = function(v){
		vertices.push(v);
		adjList.set(v, []);
	}
	/**
	 * 添加顶点之间的边
	 * @params v 顶点名称
	 * @params w 邻接顶点
	 * 将该顶点添加到顶点列表中，并且在邻接表中，设置顶点v作为键对应的字典值为一个空数组
	 */
	this.addEdge = function(v, w){
		adjList.get(v).push(w);
		adjList.get(w).push(v);
	}
	this.check = function(){
		console.info('vertices',vertices)
		console.info('adjList',adjList.getItems())
	}
	this.toString = function(){
		let string = '';
		for(let i = 0 ; i < vertices.length ; i++){
			string += `${vertices[i]} ->`;
			let neighbors = adjList.get(vertices[i]);
			for(let j = 0 ; j < neighbors.length ; j++){
				string += `${neighbors[j]} `;
			}
			string += '\n';
		}
		return string;
	}
	function initialColor(){
		let color = {};
		for(let i = 0 ; i < vertices.length ; i++){
			color[vertices[i]] = 'white';
		}
		return color;
	}
	//广度优先最短路径方法
	this.bfs = function(v, callback){
		let color = initialColor();
		let queue = new Queue();
		queue.enqueue(v);
		while(!queue.isEmpty()){
			let current = queue.dequeue();
			let neighbors = adjList.get(current);	//当前元素的邻接点数组
			color[current] = 'gray';
			for(let i = 0 ; i < neighbors.length ; i++){
				let n = neighbors[i];
				if(color[n] === 'white'){
				 	color[n] = 'gray';
					queue.enqueue(n);
				}
			}
			color[current] = 'black';
			typeof callback === 'function' && callback(current);
		}
	}
	//优化 广度优先最短路径方法
	this.BFS = function(v, callback){
		let color = initialColor();
		let queue = new Queue();
		let dis = {};		//当前v节点 距离每个节点距离
		let pred = {};		//每个节点的前溯点
		queue.enqueue(v);
		for(let i = 0 ; i < vertices.length ; i++){
			dis[vertices[i]] = 0;
			pred[vertices[i]] = null;
		}
		while(!queue.isEmpty()){
			let current = queue.dequeue();
			let neighbors = adjList.get(current);
			color[current] = 'gray';
			for(let i = 0 ; i < neighbors.length ; i++){
				let n = neighbors[i];
				if(color[n] === 'white'){
				 	color[n] = 'gray';
					dis[n] = dis[current] + 1;
					pred[n] = current;
					queue.enqueue(n);
				}
			}
			color[current] = 'black';
			typeof callback === 'function' && callback(current)
		}
		return { distances: dis, predecessors: pred, color }
	}
	//深度优先搜索
	this.dfs = function(callback){
		let color = initialColor();
		for(let i = 0 ; i < vertices.length ; i++){
			if(color[vertices[i]] === 'white'){
				dfsVisit(vertices[i], color, callback)
			}
		}
		function dfsVisit(v, color, callback){
			color[v] = 'gray';
			typeof callback === 'function' && callback(v);
			let neighbors = adjList.get(v);
			for(let i = 0 ; i < neighbors.length ; i++){
				let n = neighbors[i];
				if(color[n] === 'white'){
				 	dfsVisit(n, color, callback)
				}
			}
			color[v] = 'black';
		}
		return { distances: dis, predecessors: pred, color }
	}
	//深度优先搜索优化
	this.DFS = function(callback){
		let color = initialColor();
		let dis = {};		//当前v节点 距离每个节点距离
		let pred = {};		//每个节点的前溯点
		let time = 0;
		for(let i = 0 ; i < vertices.length ; i++){
			dis[vertices[i]] = 0;
			pred[vertices[i]] = 0;
		}
		for(let i = 0 ; i < vertices.length ; i++){
			if(color[vertices[i]] === 'white'){
				DFSVisit(vertices[i], color, callback, dis, pred);
			}
		}
		function DFSVisit(v, color, callback, dis, pred){
			color[v] = 'gray';
			dis[v] = ++time;
			typeof callback === 'function' && callback(v);
			let neighbors = adjList.get(v);
			for(let i = 0 ; i < neighbors.length ; i++){
				let n = neighbors[i];
				if(color[n] === 'white'){
					pred[n] = v;
				 	DFSVisit(n, color, callback, dis, pred);
				}
			}
			color[v] = 'black';
		}
		return { distances: dis, predecessors: pred, color }
	}
}

/*测试代码*/
let graph = new Graph();
let myVertices = ['A','B','C','D','E','F','G','H','I'];
myVertices.map((item) => { graph.addVertex(item) })
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
graph.check();
//graph.bfs(myVertices[0], function(e){ console.info('visit', e) })
//graph.BFS(myVertices[0], function(e){ console.info('visit', e) })
//graph.dfs(function(e){ console.info('visit', e) })
graph.DFS(function(e){ console.info('visit', e) })
