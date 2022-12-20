//Esto inicia la ase de datos con Azure Cosmos DB

const cosmosClient = require('@azure-cosmos').cosmosClient;
const debug = require('debug')('todo-cosmos:task');

let partitionKey = undefined;

//ESTE ES EL MODELO DE DATOS
 
class Task {

    /**
     * Lee, añade y actualiza tareas en CosmosDB
     * @param {cosmosClient} cosmosClient 
     * @param {string} databaseID 
     * @param {string} containerID 
     */

    constructor(cosmosClient, databaseID, containerID) {
        this.client = cosmosClient;
        this.databaseID = databaseID;
        this.containerID = containerID;

        this.database = null;
        this.container = null;
    }

    async init() {
        debug ("Inicializando DB");

        const dbResponse = await this.client.databases.createIfNotExists
        (
            {
            id: this.databaseID
        });

        this.database = dbResponse.database;
        debug("Inicializando Contenedor");

        const contResponse = await this.database.containers.createIfNotExists({
            id: this.containerID
        });

        this.container = contResponse.container;
    };

    /**
     * Encuentra un objeto en la DB
     * @param {string} querySpec 
     */

    async find(querySpec) {
        debug("Bucando en la DataBase")
        if(!this.container){
            throw new Error("Contenedor no de ha inicializado");
        }

        const { resources } = await this.container.items.query(querySpec).fetchAll();

        return resources;
    }

    /**
     * Crea el item enviado en Csomos DB
     * @param {*} Item 
     * @returns {resource} Item creado en la bd
     */

    async addItem(Item) {
        debug("Añadiendo item a la DB");
        item.date = Date.now();
        item.completed = false;
        const { resource: doc} = await this.container.items.create(item);

        return doc;
    }

    /**
     * 
     * @param {string} ItemID 
     * @returns 
     */

    async updateItem(ItemID) {
        debug("Actualizando item de la DB");
        const doc = await this.getItem(itemID);
        doc.completed = true;

        const {ressource: replaced} = await this.container.item(itemID, partitionKey)
        .replace(doc);

        return replaced;
    }

    /**
     * 
     * @param {string} ItemID 
     * @returns 
     */

    async getItem(ItemID) {
        debug("Buscando item en la DB");
        const { resource } = await this.container.item(itemID, partitionKey);

        return resource;
       
    };
};

module.exports = Task;
