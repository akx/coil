import {cloneDeep} from 'lodash';
import {NodeConfig} from '../types';
import {configure, duplicate} from '../universe/configure';

interface NodeCacheEntry {
  node: NodeConfig;
  parent: NodeConfig | null;
}

interface NodeCacheType {
  [key: string]: NodeCacheEntry;
}

export type UpdateListener = (root: NodeConfig[]) => void;

export class TreeManager {
  private tree: NodeConfig[] = [];
  private nodeCache: NodeCacheType = {};
  private treeUpdateListeners: UpdateListener[] = [];

  public replaceTree(newTree: NodeConfig[]) {
    this.tree = cloneDeep(newTree);
    this.updateNodeCache();
    this.invokeTreeUpdateListeners();
  }

  private updateNodeCache() {
    const newNodeCache: NodeCacheType = {};

    function walk(node: NodeConfig, parent: NodeConfig | null) {
      newNodeCache[node.id] = {node, parent};
      node.children.forEach((child) => walk(child, node));
    }

    this.tree.forEach((node) => walk(node, null));
    this.nodeCache = newNodeCache;
  }

  private invokeTreeUpdateListeners() {
    setImmediate(() => {
      this.treeUpdateListeners.forEach((listener) => {
        listener(this.tree);
      });
    });
  }

  public getNodeOrNull(nodeId: string): NodeConfig | null {
    const cacheEntry = this.getNodeCacheEntry(nodeId, false);
    return (cacheEntry ? cacheEntry.node : null);
  }

  public getNodeParentOrNull(nodeId: string): NodeConfig | null {
    const cacheEntry = this.getNodeCacheEntry(nodeId, false);
    return (cacheEntry ? cacheEntry.parent : null);
  }

  private getNode(nodeId: string): NodeConfig {
    return this.getNodeCacheEntry(nodeId)!.node;
  }

  private getNodeParent(nodeId: string): NodeConfig | null {
    return this.getNodeCacheEntry(nodeId)!.parent;
  }

  private getNodeCacheEntry(nodeId: string, check: boolean = true): NodeCacheEntry | null {
    const cacheEntry = this.nodeCache[nodeId];
    if (check && !cacheEntry) {
      throw new Error(`invalid node ${nodeId}`);
    }
    return (cacheEntry ? cacheEntry : null);
  }

  private replaceOrEmsiblingNode(
    parent: NodeConfig | null,
    nodeToReplace: NodeConfig,
    newNodes: ReadonlyArray<NodeConfig>,
    replace: boolean,
  ) {
    const childList = (parent === null ? this.tree : parent.children);
    const childIndex = childList.indexOf(nodeToReplace);
    if (childIndex > -1) {
      const args = ([childIndex, (replace ? 1 : 0)] as any[]).concat(newNodes);
      childList.splice.apply(childList, args);
    }
  }

  public getTree(): ReadonlyArray<NodeConfig> {
    return this.tree;
  }

  public addTreeUpdateListener(listener: UpdateListener) {
    this.treeUpdateListeners.push(listener);
  }

  public changeNodeVariable(nodeId: string, variableName: string, value: any) {
    const node = this.getNode(nodeId);
    node.config[variableName] = value;
    this.invokeTreeUpdateListeners();
  }

  public addChildNode(parentNodeId: string | null, module: string) {
    const newNode = configure(module, {});
    this.addChildInternal(parentNodeId, newNode);
    this.updateNodeCache();
    this.invokeTreeUpdateListeners();
    return newNode;
  }

  private addChildInternal(parentNodeId: string | null, newNode) {
    if (parentNodeId) {
      const parentNode = this.getNode(parentNodeId);
      parentNode.children.push(newNode);
      return parentNode;
    } else {
      this.tree.push(newNode);
      return null;
    }
  }

  public wrapNode(parentNodeId: string, module: string) {
    const wrappedNode = this.getNode(parentNodeId);
    const wrappedNodeParent = this.getNodeParent(parentNodeId);
    const wrapperNode = configure(module, {}, [wrappedNode]);
    this.replaceOrEmsiblingNode(wrappedNodeParent, wrappedNode, [wrapperNode], true);
    this.updateNodeCache();
    this.invokeTreeUpdateListeners();
    return wrapperNode;
  }

  public deleteNode(nodeId: string, withHierarchy: boolean) {
    const doomedNode = this.getNode(nodeId);
    const doomedNodeParent = this.getNodeParent(nodeId);
    this.replaceOrEmsiblingNode(doomedNodeParent, doomedNode, (withHierarchy ? [] : doomedNode.children), true);
    this.updateNodeCache();
    this.invokeTreeUpdateListeners();
  }

  public addSiblingNode(nodeId: string, module: string) {
    const newNode = configure(module, {});
    const node = this.getNode(nodeId);
    const nodeParent = this.getNodeParent(nodeId);
    this.replaceOrEmsiblingNode(nodeParent, node, [newNode], false);
    this.updateNodeCache();
    this.invokeTreeUpdateListeners();
  }

  public moveNode(sourceNodeId: string, newParentNodeId: string | null) {
    if (sourceNodeId === newParentNodeId) {
      return false;
    }
    const sourceNode = this.getNode(sourceNodeId);
    const sourceNodeParent = this.getNodeParent(sourceNodeId);
    // Remove from parent...
    this.replaceOrEmsiblingNode(sourceNodeParent, sourceNode, [], true);
    // Add to new parent.
    this.addChildInternal(newParentNodeId, sourceNode);
    this.updateNodeCache();
    this.invokeTreeUpdateListeners();
    return true;
  }

  public copyNode(sourceNodeId: string, targetNodeId: string | null) {
    const copiedNode = duplicate(this.getNode(sourceNodeId));
    this.addChildInternal(targetNodeId, copiedNode);
    this.updateNodeCache();
    this.invokeTreeUpdateListeners();
    return true;
  }
}
