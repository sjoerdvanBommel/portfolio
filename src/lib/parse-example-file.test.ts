import { getContent, getMetadata, hasMetadata, parseMetadataJson } from './parse-example-file'

// Test with the example format
const testContent = `{ "isModified": true }
-----
{
    "devDependencies": {
        "@types/node": "24.1.0"
    }
}`

console.log('=== Metadata JSON Parser Test ===')

// Test parsing
const parsed = parseMetadataJson(testContent)
console.log('Parsed result:', parsed)

// Test getting just the content
const content = getContent(testContent)
console.log('Content:', content)

// Test getting just the metadata
const metadata = getMetadata(testContent)
console.log('Metadata:', metadata)

// Test validation
const hasMeta = hasMetadata(testContent)
console.log('Has metadata:', hasMeta)

// Test with regular JSON (no metadata)
const regularJson = `{
    "name": "test",
    "version": "1.0.0"
}`

console.log('\n=== Regular JSON Test ===')
const regularParsed = parseMetadataJson(regularJson)
console.log('Regular JSON parsed:', regularParsed)
console.log('Has metadata:', hasMetadata(regularJson))

// Test with non-JSON metadata
const testContent2 = `This is some metadata
with multiple lines
-----
{
    "name": "test-project"
}`

console.log('\n=== Non-JSON Metadata Test ===')
const parsed2 = parseMetadataJson(testContent2)
console.log('Parsed result:', parsed2)
console.log('Metadata:', getMetadata(testContent2))
console.log('Content:', getContent(testContent2))
console.log('Has metadata:', hasMetadata(testContent2))
