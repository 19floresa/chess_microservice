

class bst
{
    left: bst | null
    right: bst | null
    key: number
    value: any

    constructor(key: number, value: any, left: bst | null = null, 
                                         right: bst | null = null)
    {
        this.left = null
        this.right = null
        this.key = key
        this.value = value
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
            const currentKey = current.key
            if (current === null || key == currentKey)
            {
                break
            }
            else if (key <= currentKey)
            {
                current = current.left
            }
            else
            {
                current = current.right
            }
        }
        return current
    }

    #findParent(key: number): bst | null | undefined
    {
        let parent: bst | null = null
        let current: bst | null = this
        if (key === current.key)
        {
            return undefined
        }

        while (current !== null)
        {
            const currentKey = current.key
            if (current === null || key === currentKey)
            {
                break
            }
            else if (key <= currentKey)
            {
                parent = current
                current = current.left
            }
            else
            {
                parent = current
                current = current.right
            }
        }
        return parent
    }

    add(key: number, value: any): boolean
    {
        const nodeNew = this.#create(key, value)
        return false
    }

    delete(): boolean
    {
        return false
    }
}