import * as bcrypt from 'bcrypt';

export async function encrypPasswod(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function generateUniqueCode() {
  const timestamp = Math.floor(Date.now() / 1000)
    .toString(36)
    .padStart(2, '0'); // 取最近秒级时间戳并转换为36进制，不足两位前面补0
  const serverId = Math.floor(Math.random() * 10000).toString(); // 生成4位0-9之间的随机数

  // 生成4位随机的大写字母和数字组合
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    const randomValue = Math.floor(Math.random() * 36); // 生成0-35之间的随机数
    randomPart +=
      randomValue < 10
        ? randomValue.toString()
        : String.fromCharCode(randomValue + 55); // 转换为对应的字符
  }

  return `MENU${timestamp}${serverId}${randomPart}`;
}

export interface TreeNode {
  id: number;
  pid: number;
  name: string; // 假设每个节点都有一个name属性，实际项目中可能有其他属性
  children?: TreeNode[];
}

export function listToTree(list: TreeNode[], rootPid = 0): TreeNode[] {
  const tree: TreeNode[] = [];
  const nodeMap: { [key: number]: TreeNode } = {};

  // 首先，将列表转换为映射，方便后续查找
  list.forEach((node) => {
    nodeMap[node.id] = node;
  });

  // 遍历列表，根据pid构建树
  list.forEach((node) => {
    if (node.pid === rootPid) {
      tree.push(node);
    } else {
      // 查找父节点并添加子节点
      const parent = nodeMap[node.pid];
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    }
  });

  return tree;
}
