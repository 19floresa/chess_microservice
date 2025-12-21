
export class bst
{
    #left: bst | null
    #right: bst | null
    #key: number
    #value: any

    constructor(key: number, value: any, left: bst | null = null, 
                                         right: bst | null = null)
    {
        this.#left = null
        this.#right = null
        this.#key = key
        this.#value = value
    }

    #create(key: number, value: any, left: bst | null = null, 
                                     right: bst | null = null)
    {
        return new bst(key, value, left, right)
    }

    search(key: number): bst | null
    {
        const { child } = this.#findNode(key)
        return child
    }

    add(key: number, value: any): boolean
    {
        const { parent, child } = this.#findNode(key)
        if (parent !== null && child === null)
        {
            const lastComparison = key - parent.getKey()
            const nodeNew = this.#create(key, value)
            lastComparison <= 0 ? parent.setLeft(nodeNew) : parent.setRight(nodeNew)
            return true
        }
        return false
    }

    delete(key: number): bst
    {
        let newRoot: bst = this
        // Find node to remove
        const { parent, child } = this.#findNode(key)
        if (parent === null && child !== null)
        {
           // const { successor } = this.#extractSuccessor(child)
        }
        else if (parent !== null && child !== null)
        {
            const { successor } = child.#extractSuccessor()
            if (successor !== null)
            {
                successor.setLeft(child.getLeft())
                successor.setRight(child.getRight())
            }

            if ((child.getKey() - parent.getKey()) <= 0)
            {
                parent.setLeft(successor)
            }
            else
            {
                parent.setRight(successor)
            }

            // Delete Child: Implicitily remove child since bst tree wont have access to it anymore
        }
        return newRoot
    }

    inorderTraversal(node: bst = this): number[]
    {
        if (node !== null)
        {
            const left: number[] = this.inorderTraversal(node.getLeft())
            const right: number[] = this.inorderTraversal(node.getRight())
            return [ node.getKey(), ...left, ...right ]
        }

        return []
    }

    getKey()
    {
        return this.#key
    }

    getValue()
    {
        return this.#value
    }

    getLeft()
    {
        return this.#left
    }

    getRight()
    {
        return this.#right
    }

    setLeft(node: bst)
    {
        this.#left = node
    }

    setRight(node: bst)
    {
        this.#right = node
    }

    /**
     * This function tries to find the node matching the key.
     * 
     * NOTE 1: If the parent is null then a duplicate node was found
     * NOTE 2: If the child is null then a leaf node was found
     * NOtE 3: child is the node matching key
     * @param key  Node to find
     * @returns  Data of the last comparison
     */
    #findNode(key: number): { parent: bst, child: bst }
    {
        // Find parent node of child with correct key
        let parent: bst = null
        let current: bst = this
        while (current !== null)
        {
            const comparison = key - current.getKey()
            if (comparison === 0)
            {
                break
            }
            else
            {
                parent = current
                current = (comparison < 0) ? current.getLeft() : current.getRight()
            }
        }

        return { parent, child: current }
    }

    #extractSuccessor(): { successor: bst }
    {
        let successor: bst = this.getRight()
        let successorParent: bst = this
        let successorTemporary: bst = null
        if (successor !== null)
        {
            // Find smallest number larger then removed node
            successorTemporary = successor.getLeft()
            while (successorTemporary !== null)
            {
                successorParent = successor
                successor = successorTemporary
                successorTemporary = successorTemporary.getLeft()
            }

            // Successor: Move right child of successor up
            successorParent.setLeft(successor.getRight())
            // // Removed Node: Reinsert left child to successor
            // successor.setLeft(this.getLeft())
        }
        else 
        {
            // Find largest number smaller then removed node
            successor = this.getLeft()
            if (successor !== null)
            {
                successorTemporary = successor.getRight()
                while (successorTemporary !== null)
                {
                    successorParent = successor
                    successor = successorTemporary
                    successorTemporary = successorTemporary.getRight()
                }

                // Successor: Move left child of successor up
                successorParent.setRight(successor.getLeft())
                // // Removed Node: Reinsert right child to successor
                // successor.setRight(this.getRight())
            }
        }

        if (successor !== null)
        {
            successor.setLeft(null)
            successor.setRight(null)
        }

        return { successor }
    }
}

