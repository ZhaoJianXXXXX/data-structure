/**
 * 实现双向链表 DoubleLinkedList
 */

function DoubleLinkedList(){
    let Node = function(element){
        this.element = element;
        this.prev = null;
        this.next = null;
    }
    let length = 0;
    let list = null;	//当前链表
    let tail = null;	//对最后一项的引用
	this.append = function(element){
		let node = new Node(element);
        let current = null;
        if(list === null){
            list = node;
        }else{
            current = list;
            //循环列表 找到最后一项
            while(current.next){
                current = current.next
            }
            //找到最后一项，将其next赋为node，建立链接
            current.next = node;
			node.prev = current;
			tail = node;
        }
        length++;
	}
	//任意位置插入元素
	this.insert = function(position, element){
		//检查越界值
		if(position >= 0 && position <= length){
			let node = new Node(element);
			let current = list;
			let pervious = null;
			let index = 0;
			if(position === 0){		//在第一个位置添加
			 	if(!list){
					list = node;
					tail = node;
				}else{
					node.next = current;
					current.prev = node;
					list = node;
				}
			}else if(position === length){	//最后一项
				current = tail;
				current.next = node;
				node.prev = current;
				tail = node;
			}else{
				while(index++ < position){
					pervious = current;
					current = current.next;
				}
				node.next = current;
				pervious.next = node;
				current.prev = node;
				node.prev = pervious;
			}
			length++;
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 从任意位置移除元素
	 * 从头部 中部 尾部移除一个元素
	 */
	this.removePosition = function(position){
		//检查越界值
		if(position > -1 && position < length){
			let current = list;
			let pervious = null;
			let index = 0;
			if(position === 0){		//移除第一项
				list = current.next;
				//如果只有一项 更新tail
				if(length === 1){
					tail = null
				}else{
					list.prev = null;
				}
			}else if(position === length - 1){	//最后一项
				current = tail;
				tail = current.prev;
				tail.next = null;
			}else{
				while(index++ < position){
					pervious = current;
					current = current.next;
				}
				//跳过当前项 前后相连
				pervious.next = current.next;
				current.next.prev = pervious;
			}
			length--;
			return current.element;
		}else{
			return null
		}
	}
	//将链表对象转为字符串
    this.toString = function(){
        let current = list;
        let string = [];
        while(current){
            string.push(current.element);
            current = current.next;
        }
        return string.join(',');
    }
	this.print = function(){
        console.info(list);
    }
}
