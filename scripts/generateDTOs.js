import fs from 'fs';
import path from 'path';
import axios from 'axios';

// This script generates TypeScript DTOs from the OpenAPI specification of the Reson8 Spring Boot Backend API.
// TODO: when deployed, these urls and directories should be injected via a pipeline or environment variables.

// URL to the OpenAPI specification
const openAPISpecUrl = 'http://localhost:8080/v3/api-docs';
const outputDirectory = './src/generated/models';  // Folder to store DTOs

// Function to fetch OpenAPI spec and generate DTOs
const generateDTOs = async () => {
  try {
    // Fetch the OpenAPI spec
    const response = await axios.get(openAPISpecUrl);
    const openAPISpec = response.data;

    // Extract schemas from the OpenAPI spec
    const schemas = openAPISpec.components?.schemas;

    if (!schemas) {
      console.error('No schemas found in the OpenAPI specification');
      return;
    }
    
    console.log(`Found ${Object.keys(schemas).length} schemas`);

    // Ensure output directory exists
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    // Loop through schemas and generate TypeScript DTOs
    for (const [modelName, modelSchema] of Object.entries(schemas)) {
      const modelFileName = path.join(outputDirectory, `${modelName}.ts`);

      // Log the model being processed and its properties
      console.log(`Processing model: ${modelName}`);
      if (!modelSchema.properties) {
        console.warn(`No properties found for model: ${modelName}`);
        continue; // Skip models without properties
      }

      console.log('Properties:', modelSchema.properties);

      // Define the content for the DTO
      let modelContent = `export interface ${modelName} {\n`;

      // Extract required properties
      const requiredProperties = modelSchema.required || [];

      // Iterate through properties of each schema
      for (const [propertyName, propertySchema] of Object.entries(modelSchema.properties)) {
        let type = propertySchema.type || 'string';  // Default to string if type is not defined

        // Map OpenAPI types to TypeScript types
        if (type === 'integer') {
          type = 'number'; // Convert integer to number
        } else if (type === 'boolean') {
          type = 'boolean';
        } else if (type === 'array' && propertySchema.items) {
          // Handle arrays (check for items type)
          const itemType = propertySchema.items?.type || 'string';
          type = `${itemType}[]`;
        } else if (type === 'object') {
          // Handle objects (default to Record<string, any>)
          type = '{ [key: string]: any }';
        }

        // If it's an enum, treat it as a string
        if (propertySchema.enum) {
          type = 'string';
        }

        // Check if the property is required and adjust accordingly
        if (requiredProperties.includes(propertyName)) {
          modelContent += `  ${propertyName}: ${type};\n`; // Non-nullable required field
        } else {
          // For non-required fields, add `null | undefined` to mark them as nullable
          modelContent += `  ${propertyName}: ${type} | null;\n`; // Nullable field (not optional)
        }
      }

      modelContent += '}\n';

      // Write the model to a file
      fs.writeFileSync(modelFileName, modelContent, 'utf-8');
      console.log(`Generated: ${modelFileName}`);
    }

    console.log('DTO generation complete.');
  } catch (error) {
    console.error('Error fetching OpenAPI spec:', error);
  }
};

// Start generating DTOs
generateDTOs();