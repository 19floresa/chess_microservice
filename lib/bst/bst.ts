

export class bst
{
    #left: bst | null = null
    #right: bst | null = null
    #key: number = -1
    #value: any = null

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
        let current: bst | null = this
        while (current !== null)
        {
            const currentKey = current.getKey()
            if (current === null || key === currentKey)
            {
                break
            }
            else if (key <= currentKey)
            {
                current = current.getLeft()
            }
            else
            {
                current = current.getRight()
            }
        }
        return current
    }

    add(key: number, value: any): boolean
    {
        const nodeParent = this.#findParent(key)
        if (nodeParent !== null)
        {
            const nodeNew = this.#create(key, value)
            const keyParent = nodeParent.getKey()
            const keyNew = nodeNew.getKey()
            if (keyNew <= keyParent)
            {
                nodeParent.setLeft(nodeNew)
            }
            else
            {
                nodeParent.setRight(nodeNew)
            }
            return true
        }
        return false
    }

    delete(key: number): boolean
    {
        return false
    }

    inorderTraversal(node: bst = this)
    {
        if (node !== null)
        {
            console.log(node.getKey())
            this.inorderTraversal(node.getLeft())
            this.inorderTraversal(node.getRight())
        }
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

    #findParent(key: number): bst
    {
        let parent: bst | null = null
        let current: bst | null = this
        if (key === current.getKey())
        {
            return current // Root case
        }

        while (current !== null)
        {
            const currentKey = current.getKey()
            if (key === currentKey)
            {
                parent = null
                break
            }
            else if (key <= currentKey)
            {
                parent = current
                current = current.getLeft()
            }
            else
            {
                parent = current
                current = current.getRight()
            }
        }
        return parent
    }
}

