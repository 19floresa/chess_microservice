function generateTimeUTC()
{
    return Date.now()
}

function timeToString(timestamp: number): string
{
    const date = new Date(timestamp)
    return date.toString()
}