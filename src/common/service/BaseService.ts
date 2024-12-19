
import api from '../api/ApiClient';
import type { PaginatedResponse } from '../types/PaginatedResponse';


export abstract class BaseService<T, ID> {
    protected readonly baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    /**
     * Save a new entity
     */
    async save(entity: Partial<T>): Promise<T> {
      
     return    (await api.post(`${this.baseUrl}`, entity)).data;
       
      
    }
  
    /**
     * Find an entity by ID
     */
    async findById(id: ID): Promise<T> {
      return (await api.get(`${this.baseUrl}/${id}`)).data;
    }
  
    /**
     * Update an existing entity
     */
    async update(id: ID, entity: Partial<T>): Promise<T> {
      return (await api.put(`${this.baseUrl}/${id}`, entity)).data;
    }
  
    /**
     * Delete an entity by ID
     */
    async deleteById(id: ID): Promise<void> {
      return await api.delete(`${this.baseUrl}/${id}`);
    }
  
    /**
     * Fetch all entities with optional filters
     */
    async findAll(filters?: Record<string, string>): Promise< T[]> {
      
        const query = filters ? '?' + new URLSearchParams(filters).toString() : '';
        return (await api.get(`${this.baseUrl}${query}`)).data;
       
    }
  
    /**
   * Fetch paginated entities with optional filters
   */
    async findAllPaginated(
        page: number,
        size: number,
        filters?: Record<string, string>
      ): Promise<PaginatedResponse<T>> {
       
          const query = filters ? '&' + new URLSearchParams(filters).toString() : '';
          return (await api.get(
            `${this.baseUrl}/paginated?page=${page}&size=${size}${query}`
          )).data;
       
      }
    
  
    /**
     * Generic error handler
     */
   
  }
  
 