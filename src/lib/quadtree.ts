import * as PIXI from 'pixi.js';

// https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374

export default class Quadtree {
  private MAX_LEVELS: number = 5;       // deepest level subnode
  private MAX_OBJECTS: number = 2;     // max # of objects node can hold until split
 
  public rectangle: any;    // the 2D, rectangular space node occupies
  public level: number;                // current node level
  public nodes: Quadtree[];            // child nodes
  public objects: any[];               // objects bounded by node
 
  constructor(level: number, rect: any) {
    this.rectangle = rect;
    this.level = level;
    this.nodes = [];
    this.objects = [];
  }

  /*
   * Clears the quadtree.
   */
   clear() {
     this.objects = [];

     for (let idx = 0; idx < this.nodes.length; idx++) {
       if (this.nodes[idx] !== null) {
         this.nodes[idx].clear();
         this.nodes[idx] = null;
       }
     }
   }

  /*
   * Splits the node into 4 subnodes.
   */
  split() {
    const { x, y, width, height } = this.rectangle;
    // Calculate level of subnodes
    const nextLevel = this.level + 1;
    // Calculate dimensions of subnodes
    const subWidth: number = width / 2;
    const subHeight: number = height / 2;
    //Calculate new x and y positions
    const subX: number = x + subWidth;
    const subY: number = y + subHeight;

    this.nodes[0] = new Quadtree(nextLevel, new PIXI.Rectangle(subX, y, subWidth, subHeight));
    this.nodes[1] = new Quadtree(nextLevel, new PIXI.Rectangle(x, y, subWidth, subHeight));
    this.nodes[2] = new Quadtree(nextLevel, new PIXI.Rectangle(x, subY, subWidth, subHeight));
    this.nodes[3] = new Quadtree(nextLevel, new PIXI.Rectangle(subX, subY, subWidth, subHeight));
  }

  /*
   * Determine which node the object belongs to. -1 means object cannot completely
   * fit within a child node and is part of the parent node.
   */
  private getNodeIndex(object: PIXI.AnimatedSprite): number {
    let nodeIdx: number = -1;
    const verticalMidpoint: number = this.rectangle.x + (this.rectangle.width / 2);
    const horizontalMidpoint: number = this.rectangle.y + (this.rectangle.height / 2);

    // Object can completely fit within the top quadrants
    const topQuadrant: boolean = object.y < horizontalMidpoint && object.y + object.height < horizontalMidpoint;

    // Object can completely fit within the bottom quadrants
    const bottomQuadrant: boolean = object.y > horizontalMidpoint;

    if (object.x < verticalMidpoint && object.x + object.width < verticalMidpoint) {
      // Object can completely fit within the left quadrants
       if (topQuadrant) {
         nodeIdx = 1;
       } else if (bottomQuadrant) {
         nodeIdx = 2;
       }
     } else if (object.x > verticalMidpoint) {
       // Object can completely fit within the right quadrants
      if (topQuadrant) {
        nodeIdx = 0;
      } else if (bottomQuadrant) {
        nodeIdx = 3;
      }
    }

    return nodeIdx;
  }

  /*
   * Insert the object into the quadtree. If the node exceeds the capacity,
   * it will split and add all objects to their corresponding nodes.
   */
  public insert(object: PIXI.AnimatedSprite) {
    // If subnodes exist, call insert on corresponding subnode instead
    if (this.nodes[0]) {
      const nodeIdx: number = this.getNodeIndex(object);
      if (nodeIdx > -1) {
        this.nodes[nodeIdx].insert(object);
        return;
      }
    }

    // Otherwise insert object into this node
    this.objects.push(object);

    // Max objects reached for this level
    if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
      // Split node into subnodes if we haven't already 
      if (!this.nodes[0]) {
        this.split(); 
      }

      // Insert objects into corresponding subnodes
      for (const object of this.objects) {
        const nodeIdx: number = this.getNodeIndex(object);
        if (nodeIdx > -1) {
          this.nodes[nodeIdx].insert(object);
        }
      }
    }
  }

  /*
   * Return all objects in same node of given object.
   * Returned objects are collision candidates.
   */
  public retrieve(object: PIXI.AnimatedSprite): any[] {
    let returnObjects = this.objects;

    // Retrieve the objects from the corresponding subnode
    if (this.nodes[0]) {
      const nodeIdx: number = this.getNodeIndex(object);
      if (nodeIdx > -1) {
        const subObjects = this.nodes[nodeIdx].retrieve(object);
        returnObjects = returnObjects.concat(subObjects);
      }
    }

    return returnObjects;
  }
}
