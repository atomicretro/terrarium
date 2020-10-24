interface boundaryType {
  x: number;        // the horizontal potiion of top-left corner of the bounding rectangle
  y: number;        // the vertical potiion of top-left corner of the bounding rectangle
  width: number;    // the horizontal size of the bounding rectangle
  height: number;   // the vertical size of the bounding rectangle
}

// https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374

class Quadtree {
 
  private MAX_LEVELS: number = 5;     // deepest level subnode
  private MAX_OBJECTS: number = 10;   // max # of objects node can hold until split
 
  private boundary: boundaryType;     // the 2D, rectangular space node occupies
  private level: number;              // current node level
  private nodes: Quadtree[];          // child nodes
  private objects: any[];             // objects bounded by node
 
  constructor(pLevel: number, pBoundry: any) {
    this.boundary = pBoundry;
    this.level = pLevel;
    this.nodes = new Array(4);
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
    // Destructure x and y from boundary for easy reference
    const { x, y } = this.boundary;
    // Calculate level of subnodes
    const nextLevel = this.level + 1;
    // Calculate dimensions of subnodes
    const subWidth: number = this.boundary.width / 2;
    const subHeight: number = this.boundary.height / 2;
    //Calculate new x and y positions
    const subX: number = x + subWidth;
    const subY: number = y + subHeight;

    this.nodes[0] = new Quadtree(nextLevel, this.buildBoundary(subX, y, subWidth, subHeight));
    this.nodes[1] = new Quadtree(nextLevel, this.buildBoundary(x, y, subWidth, subHeight));
    this.nodes[2] = new Quadtree(nextLevel, this.buildBoundary(x, subY, subWidth, subHeight));
    this.nodes[3] = new Quadtree(nextLevel, this.buildBoundary(subX, subY, subWidth, subHeight));
  }

  private buildBoundary(x: number, y: number, width: number, height: number): boundaryType {
    return { x, y, width, height };
  }

  /*
   * Determine which node the object belongs to. -1 means object cannot completely
   * fit within a child node and is part of the parent node.
   */
  private getIndex(pRect: boundaryType): number {
    let nodeIdx: number = -1;
    const verticalMidpoint: number = this.boundary.x + (this.boundary.width / 2);
    const horizontalMidpoint: number = this.boundary.y + (this.boundary.height / 2);

    // Object can completely fit within the top quadrants
    const topQuadrant: boolean = pRect.y < horizontalMidpoint && pRect.y + pRect.height < horizontalMidpoint;

    // Object can completely fit within the bottom quadrants
    const bottomQuadrant: boolean = pRect.y > horizontalMidpoint;

    // Object can completely fit within the left quadrants
    if (pRect.x < verticalMidpoint && pRect.x + pRect.width < verticalMidpoint) {
       if (topQuadrant) {
         nodeIdx = 1;
       } else if (bottomQuadrant) {
         nodeIdx = 2;
       }
     }

     // Object can completely fit within the right quadrants
     else if (pRect.x > verticalMidpoint) {
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
  public insert(pRect: boundaryType) {
    if (this.nodes[0] !== null) {
      const nodeIdx: number = this.getIndex(pRect);
      if (nodeIdx > -1) {
        this.nodes[nodeIdx].insert(pRect);
        return;
      }
    }

    this.objects.push(pRect);

    if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
       if (this.nodes[0] === null) { 
          this.split(); 
       }

       for (const object of this.objects) {
         const nodeIdx: number = this.getIndex(object);
         if (nodeIdx > -1) {
            this.nodes[nodeIdx].insert(object);
         }
       }
    }
  }

  /*
   * Return all objects that could collide with the given object.
   */
  public retrieve(returnObjects: any[], pRect: boundaryType): any[] {
    const nodeIdx: number = this.getIndex(pRect);
    if (nodeIdx > -1 && this.nodes[0] !== null) {
      this.nodes[nodeIdx].retrieve(returnObjects, pRect);
    }

    returnObjects.concat(this.objects);
    return returnObjects;
  }
}
