/*
 * modified version indefinite-article.js v2.0.0m, 2021 of
 * indefinite-article.js v1.0.0, 12-18-2011
 *
 * author: Rodrigo Neri (@rigoneri)
 * modified: Domi04151309
 *
 * (The MIT License)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

 export default phrase => {

    // Getting the first word
    var word = null
    const match = /\w+/.exec(phrase)
    if (match) word = match[0]
    else return null

    const lowerCase = word.toLowerCase()
    // Specific start of words that should be preceeded by 'an'
    for (const altCase of ['honest', 'hour', 'hono']) {
      if (lowerCase.indexOf(altCase) == 0) return 'an'
    }

    // Single letter word which should be preceeded by 'an'
    if (lowerCase.length == 1) {
      if ('aedhilmnorsx'.indexOf(lowerCase) >= 0) return 'an'
      else return 'a'
    }

    // Capital words which should likely be preceeded by 'an'
    if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) return 'an'

    // Special cases where a word that begins with a vowel should be preceeded by 'a'
    for (const regex of [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/]) {
      if (lowerCase.match(regex)) return 'a'
    }

    // Special capital words (UK, UN)
    if (word.match(/^U[NK][AIEO]/)) return 'a'
    else if (word == word.toUpperCase()) {
        if ('aedhilmnorsx'.indexOf(lowerCase[0]) >= 0) return 'an'
        else return 'a'
    }

    // Basic method of words that begin with a vowel being preceeded by 'an'
    if ('aeiou'.indexOf(lowerCase[0]) >= 0) return 'an'

    // Instances where y follwed by specific letters is preceeded by 'an'
    if (lowerCase.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/)) return 'an'

    return 'a'
}
