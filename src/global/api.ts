import { format } from 'url'
import 'whatwg-fetch' // eslint-disable-line import/no-unassigned-import

export async function translate(
  text: string,
  targetLanguage: string
): Promise<Array<string>> {
  const query: string = format({
    query: {
      client: 'gtx',
      sl: 'auto',
      tl: targetLanguage,
      dt: 't',
      q: text,
    },
  })
  const endpoint: string = `http://translate.googleapis.com/translate_a/single${query}`

  try {
    const response = await fetch(endpoint)
    const body: string = await response.text()
    const data = JSON.parse(
      body.replace(/,,/g, ',null,').replace(/,,/g, ',null,')
    )
    const translatedText = data[0]
      .map((sentence: string) => sentence[0])
      .join('<br/>')
    return translatedText
  } catch (err) {
    Promise.reject(err)
  }
}
