

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

    #find(key: number): bst | null
    {
        let current: bst = this
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

        // TODO: Make find parent
    add(key: number, value: any)
    {
        const nodeNew = this.#create(key, value)
    }
}