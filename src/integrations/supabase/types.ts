export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      accommodation_images: {
        Row: {
          accommodation_id: string | null
          alt_text: string
          created_at: string | null
          id: string
          image_url: string
          pg_name: string
          sort_order: number
        }
        Insert: {
          accommodation_id?: string | null
          alt_text: string
          created_at?: string | null
          id?: string
          image_url: string
          pg_name: string
          sort_order?: number
        }
        Update: {
          accommodation_id?: string | null
          alt_text?: string
          created_at?: string | null
          id?: string
          image_url?: string
          pg_name?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_images_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodations: {
        Row: {
          address: string
          brochure_link: string | null
          code: string
          contact: string
          created_at: string | null
          description: string
          email: string
          features: string[]
          id: string
          main_image: string
          maps_link: string | null
          name: string
          pg_category: string
          updated_at: string | null
        }
        Insert: {
          address: string
          brochure_link?: string | null
          code: string
          contact: string
          created_at?: string | null
          description: string
          email: string
          features?: string[]
          id?: string
          main_image: string
          maps_link?: string | null
          name: string
          pg_category: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          brochure_link?: string | null
          code?: string
          contact?: string
          created_at?: string | null
          description?: string
          email?: string
          features?: string[]
          id?: string
          main_image?: string
          maps_link?: string | null
          name?: string
          pg_category?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      agent_embeddings: {
        Row: {
          agents_code: string | null
          created_at: string | null
          embedding: string | null
          folder_name: string
          id: number
          init_code: string | null
          main_code: string | null
          mcp_json: string | null
          metadata: Json | null
          models_code: string | null
          purpose: string | null
          tools_code: string | null
        }
        Insert: {
          agents_code?: string | null
          created_at?: string | null
          embedding?: string | null
          folder_name: string
          id?: number
          init_code?: string | null
          main_code?: string | null
          mcp_json?: string | null
          metadata?: Json | null
          models_code?: string | null
          purpose?: string | null
          tools_code?: string | null
        }
        Update: {
          agents_code?: string | null
          created_at?: string | null
          embedding?: string | null
          folder_name?: string
          id?: number
          init_code?: string | null
          main_code?: string | null
          mcp_json?: string | null
          metadata?: Json | null
          models_code?: string | null
          purpose?: string | null
          tools_code?: string | null
        }
        Relationships: []
      }
      agent_patterns: {
        Row: {
          agent_code: string
          agent_name: string
          agent_type: string
          complexity_level: number | null
          created_at: string | null
          embeddings: string | null
          id: string
          init_code: string
          metadata: Json | null
          purpose: string
          required_dependencies: string[] | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          agent_code: string
          agent_name: string
          agent_type: string
          complexity_level?: number | null
          created_at?: string | null
          embeddings?: string | null
          id?: string
          init_code: string
          metadata?: Json | null
          purpose: string
          required_dependencies?: string[] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          agent_code?: string
          agent_name?: string
          agent_type?: string
          complexity_level?: number | null
          created_at?: string | null
          embeddings?: string | null
          id?: string
          init_code?: string
          metadata?: Json | null
          purpose?: string
          required_dependencies?: string[] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      agent_templates: {
        Row: {
          agents_code: string | null
          created_at: string
          crew_code: string | null
          embedding: string | null
          folder_name: string
          id: number
          metadata: Json | null
          purpose: string | null
          tasks_code: string | null
          tools_code: string | null
        }
        Insert: {
          agents_code?: string | null
          created_at?: string
          crew_code?: string | null
          embedding?: string | null
          folder_name: string
          id?: never
          metadata?: Json | null
          purpose?: string | null
          tasks_code?: string | null
          tools_code?: string | null
        }
        Update: {
          agents_code?: string | null
          created_at?: string
          crew_code?: string | null
          embedding?: string | null
          folder_name?: string
          id?: never
          metadata?: Json | null
          purpose?: string | null
          tasks_code?: string | null
          tools_code?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          applied_at: string
          candidate_id: string | null
          id: string
          job_id: string | null
          notes: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          applied_at?: string
          candidate_id?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          applied_at?: string
          candidate_id?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      archon_code_examples: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          source_id: string
          summary: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id: string
          summary: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id?: string
          summary?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "archon_code_examples_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "archon_sources"
            referencedColumns: ["source_id"]
          },
        ]
      }
      archon_crawled_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          source_id: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "archon_crawled_pages_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "archon_sources"
            referencedColumns: ["source_id"]
          },
        ]
      }
      archon_document_versions: {
        Row: {
          change_summary: string | null
          change_type: string | null
          content: Json
          created_at: string | null
          created_by: string | null
          document_id: string | null
          field_name: string
          id: string
          project_id: string | null
          task_id: string | null
          version_number: number
        }
        Insert: {
          change_summary?: string | null
          change_type?: string | null
          content: Json
          created_at?: string | null
          created_by?: string | null
          document_id?: string | null
          field_name: string
          id?: string
          project_id?: string | null
          task_id?: string | null
          version_number: number
        }
        Update: {
          change_summary?: string | null
          change_type?: string | null
          content?: Json
          created_at?: string | null
          created_by?: string | null
          document_id?: string | null
          field_name?: string
          id?: string
          project_id?: string | null
          task_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "archon_document_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "archon_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archon_document_versions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "archon_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      archon_project_sources: {
        Row: {
          created_by: string | null
          id: string
          linked_at: string | null
          notes: string | null
          project_id: string | null
          source_id: string
        }
        Insert: {
          created_by?: string | null
          id?: string
          linked_at?: string | null
          notes?: string | null
          project_id?: string | null
          source_id: string
        }
        Update: {
          created_by?: string | null
          id?: string
          linked_at?: string | null
          notes?: string | null
          project_id?: string | null
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "archon_project_sources_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "archon_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      archon_projects: {
        Row: {
          created_at: string | null
          data: Json | null
          description: string | null
          docs: Json | null
          features: Json | null
          github_repo: string | null
          id: string
          pinned: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          description?: string | null
          docs?: Json | null
          features?: Json | null
          github_repo?: string | null
          id?: string
          pinned?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          description?: string | null
          docs?: Json | null
          features?: Json | null
          github_repo?: string | null
          id?: string
          pinned?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      archon_prompts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          prompt: string
          prompt_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          prompt: string
          prompt_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          prompt?: string
          prompt_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      archon_settings: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          encrypted_value: string | null
          id: string
          is_encrypted: boolean | null
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          encrypted_value?: string | null
          id?: string
          is_encrypted?: boolean | null
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          encrypted_value?: string | null
          id?: string
          is_encrypted?: boolean | null
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      archon_sources: {
        Row: {
          created_at: string
          metadata: Json | null
          source_id: string
          summary: string | null
          title: string | null
          total_word_count: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          metadata?: Json | null
          source_id: string
          summary?: string | null
          title?: string | null
          total_word_count?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          metadata?: Json | null
          source_id?: string
          summary?: string | null
          title?: string | null
          total_word_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      archon_tasks: {
        Row: {
          archived: boolean | null
          archived_at: string | null
          archived_by: string | null
          assignee: string | null
          code_examples: Json | null
          created_at: string | null
          description: string | null
          feature: string | null
          id: string
          parent_task_id: string | null
          project_id: string | null
          sources: Json | null
          status: Database["public"]["Enums"]["task_status"] | null
          task_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          archived?: boolean | null
          archived_at?: string | null
          archived_by?: string | null
          assignee?: string | null
          code_examples?: Json | null
          created_at?: string | null
          description?: string | null
          feature?: string | null
          id?: string
          parent_task_id?: string | null
          project_id?: string | null
          sources?: Json | null
          status?: Database["public"]["Enums"]["task_status"] | null
          task_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          archived?: boolean | null
          archived_at?: string | null
          archived_by?: string | null
          assignee?: string | null
          code_examples?: Json | null
          created_at?: string | null
          description?: string | null
          feature?: string | null
          id?: string
          parent_task_id?: string | null
          project_id?: string | null
          sources?: Json | null
          status?: Database["public"]["Enums"]["task_status"] | null
          task_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "archon_tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "archon_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archon_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "archon_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          amount: number
          bill_date: string
          created_at: string
          details: string | null
          due_date: string
          id: string
          invoice_id: string
          resident_id: string
          room_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          bill_date?: string
          created_at?: string
          details?: string | null
          due_date: string
          id?: string
          invoice_id: string
          resident_id: string
          room_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          bill_date?: string
          created_at?: string
          details?: string | null
          due_date?: string
          id?: string
          invoice_id?: string
          resident_id?: string
          room_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bills_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          id: number
          name: string
          specialization: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: number
          name: string
          specialization?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: number
          name?: string
          specialization?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: number
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_post_tags: {
        Row: {
          id: number
          post_id: number | null
          tag_id: number | null
        }
        Insert: {
          id?: number
          post_id?: number | null
          tag_id?: number | null
        }
        Update: {
          id?: number
          post_id?: number | null
          tag_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_views: {
        Row: {
          id: number
          ip_address: unknown | null
          post_id: number | null
          user_agent: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: number
          ip_address?: unknown | null
          post_id?: number | null
          user_agent?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: number
          ip_address?: unknown | null
          post_id?: number | null
          user_agent?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts_with_details"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: number | null
          category_id: number | null
          content: string
          created_at: string | null
          excerpt: string
          featured: boolean | null
          featured_image: string | null
          id: number
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          read_time: number | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: number | null
          category_id?: number | null
          content: string
          created_at?: string | null
          excerpt: string
          featured?: boolean | null
          featured_image?: string | null
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: number | null
          category_id?: number | null
          content?: string
          created_at?: string | null
          excerpt?: string
          featured?: boolean | null
          featured_image?: string | null
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "blog_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          created_at: string | null
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      c_mobile: {
        Row: {
          company_name: string | null
          created_at: string
          id: number
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      candidates: {
        Row: {
          created_at: string
          current_status: string | null
          email: string | null
          experience_years: number | null
          full_name: string
          id: string
          nationality: string | null
          passport_number: string | null
          phone: string
          skills: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_status?: string | null
          email?: string | null
          experience_years?: number | null
          full_name: string
          id?: string
          nationality?: string | null
          passport_number?: string | null
          phone: string
          skills?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_status?: string | null
          email?: string | null
          experience_years?: number | null
          full_name?: string
          id?: string
          nationality?: string | null
          passport_number?: string | null
          phone?: string
          skills?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      career_applications: {
        Row: {
          application_status: string | null
          cover_letter: string | null
          created_at: string | null
          email: string
          first_name: string
          id: number
          interview_date: string | null
          last_name: string
          notice_period: string | null
          phone: string | null
          position_applied: string
          resume_file_name: string | null
          resume_file_path: string | null
          resume_file_size: number | null
          resume_file_type: string | null
          review_notes: string | null
          reviewed_by: string | null
          salary_expectation: string | null
          updated_at: string | null
        }
        Insert: {
          application_status?: string | null
          cover_letter?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: number
          interview_date?: string | null
          last_name: string
          notice_period?: string | null
          phone?: string | null
          position_applied: string
          resume_file_name?: string | null
          resume_file_path?: string | null
          resume_file_size?: number | null
          resume_file_type?: string | null
          review_notes?: string | null
          reviewed_by?: string | null
          salary_expectation?: string | null
          updated_at?: string | null
        }
        Update: {
          application_status?: string | null
          cover_letter?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: number
          interview_date?: string | null
          last_name?: string
          notice_period?: string | null
          phone?: string | null
          position_applied?: string
          resume_file_name?: string | null
          resume_file_path?: string | null
          resume_file_size?: number | null
          resume_file_type?: string | null
          review_notes?: string | null
          reviewed_by?: string | null
          salary_expectation?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      career_positions: {
        Row: {
          created_at: string | null
          department: string | null
          description: string | null
          employment_type: string | null
          experience_required: string | null
          id: number
          location: string | null
          requirements: string | null
          responsibilities: string | null
          salary_range: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          experience_required?: string | null
          id?: number
          location?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          experience_required?: string | null
          id?: number
          location?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chats: {
        Row: {
          created_at: string
          id: string
          messages: Json
          svg_code: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages: Json
          svg_code?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          svg_code?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          company_name: string
          contact_person: string | null
          country_id: string | null
          created_at: string
          email: string | null
          id: string
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company_name: string
          contact_person?: string | null
          country_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string
          contact_person?: string | null
          country_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      code_versions: {
        Row: {
          code_content: string
          created_at: string | null
          flow_snapshot: Json | null
          generation_method: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          project_id: string | null
          user_id: string | null
          version: number
        }
        Insert: {
          code_content: string
          created_at?: string | null
          flow_snapshot?: Json | null
          generation_method?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          project_id?: string | null
          user_id?: string | null
          version: number
        }
        Update: {
          code_content?: string
          created_at?: string | null
          flow_snapshot?: Json | null
          generation_method?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          project_id?: string | null
          user_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "code_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          company: string | null
          email: string
          first_name: string
          id: number
          ip_address: string | null
          last_name: string
          message: string
          newsletter_opt_in: boolean | null
          notes: string | null
          phone: string | null
          replied_by: string | null
          reply_date: string | null
          source: string | null
          status: string | null
          subject: string
          submission_date: string | null
          user_agent: string | null
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          email: string
          first_name: string
          id?: number
          ip_address?: string | null
          last_name: string
          message: string
          newsletter_opt_in?: boolean | null
          notes?: string | null
          phone?: string | null
          replied_by?: string | null
          reply_date?: string | null
          source?: string | null
          status?: string | null
          subject: string
          submission_date?: string | null
          user_agent?: string | null
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          email?: string
          first_name?: string
          id?: number
          ip_address?: string | null
          last_name?: string
          message?: string
          newsletter_opt_in?: boolean | null
          notes?: string | null
          phone?: string | null
          replied_by?: string | null
          reply_date?: string | null
          source?: string | null
          status?: string | null
          subject?: string
          submission_date?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      contact_submissions_audit: {
        Row: {
          action: string | null
          audit_id: number
          change_date: string | null
          changed_by: string | null
          new_values: Json | null
          old_values: Json | null
          submission_id: number | null
        }
        Insert: {
          action?: string | null
          audit_id?: number
          change_date?: string | null
          changed_by?: string | null
          new_values?: Json | null
          old_values?: Json | null
          submission_id?: number | null
        }
        Update: {
          action?: string | null
          audit_id?: number
          change_date?: string | null
          changed_by?: string | null
          new_values?: Json | null
          old_values?: Json | null
          submission_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_submissions_audit_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      crew_site_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      custom_templates: {
        Row: {
          categories: string[] | null
          created_at: string | null
          dependencies: string[] | null
          description: string | null
          difficulty_level: number | null
          embeddings: string | null
          extra_data: Json | null
          setup_code: string | null
          template_code: string
          template_id: number
          template_name: string
          template_type: string
          updated_at: string | null
        }
        Insert: {
          categories?: string[] | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          difficulty_level?: number | null
          embeddings?: string | null
          extra_data?: Json | null
          setup_code?: string | null
          template_code: string
          template_id?: number
          template_name: string
          template_type: string
          updated_at?: string | null
        }
        Update: {
          categories?: string[] | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          difficulty_level?: number | null
          embeddings?: string | null
          extra_data?: Json | null
          setup_code?: string | null
          template_code?: string
          template_id?: number
          template_name?: string
          template_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          address_field: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          address_field?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          address_field?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          candidate_id: string | null
          document_type: string
          expiry_date: string | null
          file_name: string
          file_path: string
          id: string
          upload_date: string
        }
        Insert: {
          candidate_id?: string | null
          document_type: string
          expiry_date?: string | null
          file_name: string
          file_path: string
          id?: string
          upload_date?: string
        }
        Update: {
          candidate_id?: string | null
          document_type?: string
          expiry_date?: string | null
          file_name?: string
          file_path?: string
          id?: string
          upload_date?: string
        }
        Relationships: []
      }
      electricity_readings: {
        Row: {
          amount: number
          created_at: string
          current_reading: number
          id: string
          previous_reading: number
          rate: number
          reading_date: string
          room_id: string
          status: string
          units: number
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          current_reading: number
          id?: string
          previous_reading: number
          rate: number
          reading_date?: string
          room_id: string
          status?: string
          units: number
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          current_reading?: number
          id?: string
          previous_reading?: number
          rate?: number
          reading_date?: string
          room_id?: string
          status?: string
          units?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "electricity_readings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          Area: string | null
          "Assigned By": string | null
          "Assigned To": string | null
          Budget: string | null
          "Client Name": string | null
          Configuration: string | null
          "Created Date": string | null
          created_at: string | null
          Email: string | null
          "Enquiry For": string | null
          "Enquiry Progress": string | null
          "Enquiry Source": string | null
          Favourite: string | null
          "First Phone Call Date": string | null
          "First Sales Comments": string | null
          "First Site Visit Date": string | null
          id: number
          "Last Remarks": string | null
          Mobile: string | null
          "Near to Win": string | null
          NFD: string | null
          "Property Type": string | null
          Remarks: string | null
          "Site Visit Scheduled Date": string | null
          updated_at: string | null
        }
        Insert: {
          Area?: string | null
          "Assigned By"?: string | null
          "Assigned To"?: string | null
          Budget?: string | null
          "Client Name"?: string | null
          Configuration?: string | null
          "Created Date"?: string | null
          created_at?: string | null
          Email?: string | null
          "Enquiry For"?: string | null
          "Enquiry Progress"?: string | null
          "Enquiry Source"?: string | null
          Favourite?: string | null
          "First Phone Call Date"?: string | null
          "First Sales Comments"?: string | null
          "First Site Visit Date"?: string | null
          id?: number
          "Last Remarks"?: string | null
          Mobile?: string | null
          "Near to Win"?: string | null
          NFD?: string | null
          "Property Type"?: string | null
          Remarks?: string | null
          "Site Visit Scheduled Date"?: string | null
          updated_at?: string | null
        }
        Update: {
          Area?: string | null
          "Assigned By"?: string | null
          "Assigned To"?: string | null
          Budget?: string | null
          "Client Name"?: string | null
          Configuration?: string | null
          "Created Date"?: string | null
          created_at?: string | null
          Email?: string | null
          "Enquiry For"?: string | null
          "Enquiry Progress"?: string | null
          "Enquiry Source"?: string | null
          Favourite?: string | null
          "First Phone Call Date"?: string | null
          "First Sales Comments"?: string | null
          "First Site Visit Date"?: string | null
          id?: number
          "Last Remarks"?: string | null
          Mobile?: string | null
          "Near to Win"?: string | null
          NFD?: string | null
          "Property Type"?: string | null
          Remarks?: string | null
          "Site Visit Scheduled Date"?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      exchange_phones: {
        Row: {
          added_to_inventory: boolean | null
          brand: string
          color: string | null
          condition: string
          created_at: string | null
          exchange_value: number
          id: string
          imei: string | null
          inventory_id: string | null
          model: string
          notes: string | null
          sales_id: string | null
          specifications: string | null
          storage: string | null
          updated_at: string | null
        }
        Insert: {
          added_to_inventory?: boolean | null
          brand: string
          color?: string | null
          condition: string
          created_at?: string | null
          exchange_value?: number
          id?: string
          imei?: string | null
          inventory_id?: string | null
          model: string
          notes?: string | null
          sales_id?: string | null
          specifications?: string | null
          storage?: string | null
          updated_at?: string | null
        }
        Update: {
          added_to_inventory?: boolean | null
          brand?: string
          color?: string | null
          condition?: string
          created_at?: string | null
          exchange_value?: number
          id?: string
          imei?: string | null
          inventory_id?: string | null
          model?: string
          notes?: string | null
          sales_id?: string | null
          specifications?: string | null
          storage?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exchange_phones_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exchange_phones_sales_id_fkey"
            columns: ["sales_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      hall_enquiries: {
        Row: {
          advance_amount: number | null
          Area: string | null
          "Assigned By": string | null
          "Assigned To": string | null
          Budget: string | null
          cancellation_reason: string | null
          catering_required: boolean | null
          "Client Name": string
          Configuration: string | null
          "Created Date": string
          created_at: string | null
          created_by: string | null
          decoration_required: boolean | null
          Email: string | null
          "Enquiry For": string | null
          "Enquiry Progress": string | null
          "Enquiry Source": string | null
          event_date: string | null
          expected_guests: number | null
          Favourite: string | null
          "First Phone Call Date": string | null
          "First Sales Comments": string | null
          "First Site Visit Date": string | null
          followup_count: number | null
          id: string
          "Last Remarks": string | null
          last_followup_date: string | null
          Mobile: string
          "Near to Win": string | null
          NFD: string | null
          parking_required: boolean | null
          payment_status: string | null
          priority: string | null
          "Property Type": string | null
          Remarks: string | null
          requirements: string | null
          "Site Visit Scheduled Date": string | null
          source: string | null
          time_slot: string | null
          total_amount: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          advance_amount?: number | null
          Area?: string | null
          "Assigned By"?: string | null
          "Assigned To"?: string | null
          Budget?: string | null
          cancellation_reason?: string | null
          catering_required?: boolean | null
          "Client Name": string
          Configuration?: string | null
          "Created Date": string
          created_at?: string | null
          created_by?: string | null
          decoration_required?: boolean | null
          Email?: string | null
          "Enquiry For"?: string | null
          "Enquiry Progress"?: string | null
          "Enquiry Source"?: string | null
          event_date?: string | null
          expected_guests?: number | null
          Favourite?: string | null
          "First Phone Call Date"?: string | null
          "First Sales Comments"?: string | null
          "First Site Visit Date"?: string | null
          followup_count?: number | null
          id: string
          "Last Remarks"?: string | null
          last_followup_date?: string | null
          Mobile: string
          "Near to Win"?: string | null
          NFD?: string | null
          parking_required?: boolean | null
          payment_status?: string | null
          priority?: string | null
          "Property Type"?: string | null
          Remarks?: string | null
          requirements?: string | null
          "Site Visit Scheduled Date"?: string | null
          source?: string | null
          time_slot?: string | null
          total_amount?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          advance_amount?: number | null
          Area?: string | null
          "Assigned By"?: string | null
          "Assigned To"?: string | null
          Budget?: string | null
          cancellation_reason?: string | null
          catering_required?: boolean | null
          "Client Name"?: string
          Configuration?: string | null
          "Created Date"?: string
          created_at?: string | null
          created_by?: string | null
          decoration_required?: boolean | null
          Email?: string | null
          "Enquiry For"?: string | null
          "Enquiry Progress"?: string | null
          "Enquiry Source"?: string | null
          event_date?: string | null
          expected_guests?: number | null
          Favourite?: string | null
          "First Phone Call Date"?: string | null
          "First Sales Comments"?: string | null
          "First Site Visit Date"?: string | null
          followup_count?: number | null
          id?: string
          "Last Remarks"?: string | null
          last_followup_date?: string | null
          Mobile?: string
          "Near to Win"?: string | null
          NFD?: string | null
          parking_required?: boolean | null
          payment_status?: string | null
          priority?: string | null
          "Property Type"?: string | null
          Remarks?: string | null
          requirements?: string | null
          "Site Visit Scheduled Date"?: string | null
          source?: string | null
          time_slot?: string | null
          total_amount?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      Inquiry_Progress: {
        Row: {
          created_at: string
          date: string | null
          eid: number | null
          id: number
          progress_type: string | null
          remark: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          eid?: number | null
          id?: number
          progress_type?: string | null
          remark?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          eid?: number | null
          id?: number
          progress_type?: string | null
          remark?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Inquiry_Progress_eid_fkey"
            columns: ["eid"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string | null
          created_at: string
          feedback: string | null
          id: string
          interviewer_id: string | null
          scheduled_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          interviewer_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          interviewer_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          additional_notes: string | null
          additional_sale_notes: string | null
          battery_health: number | null
          brand: string
          color: string | null
          condition: string
          created_at: string
          customer_address: string | null
          customer_name: string | null
          customer_phone: string | null
          exchange_old_phone: boolean | null
          id: string
          imei: string
          inward_by: string | null
          model: string
          payment_method: string | null
          purchase_date: string
          purchase_price: number
          quantity: number | null
          sale_date: string | null
          sale_price: number
          sold_date: string | null
          status: string
          supplier_id: string | null
          updated_at: string
          variant: string | null
          venue: string | null
          warranty_months: number | null
        }
        Insert: {
          additional_notes?: string | null
          additional_sale_notes?: string | null
          battery_health?: number | null
          brand: string
          color?: string | null
          condition?: string
          created_at?: string
          customer_address?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          exchange_old_phone?: boolean | null
          id?: string
          imei: string
          inward_by?: string | null
          model: string
          payment_method?: string | null
          purchase_date: string
          purchase_price: number
          quantity?: number | null
          sale_date?: string | null
          sale_price: number
          sold_date?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string
          variant?: string | null
          venue?: string | null
          warranty_months?: number | null
        }
        Update: {
          additional_notes?: string | null
          additional_sale_notes?: string | null
          battery_health?: number | null
          brand?: string
          color?: string | null
          condition?: string
          created_at?: string
          customer_address?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          exchange_old_phone?: boolean | null
          id?: string
          imei?: string
          inward_by?: string | null
          model?: string
          payment_method?: string | null
          purchase_date?: string
          purchase_price?: number
          quantity?: number | null
          sale_date?: string | null
          sale_price?: number
          sold_date?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string
          variant?: string | null
          venue?: string | null
          warranty_months?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          customer_id: string | null
          discount: number | null
          due_date: string | null
          id: string
          invoice_date: string
          invoice_id: string
          sale_id: string | null
          status: string
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          discount?: number | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_id: string
          sale_id?: string | null
          status?: string
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          discount?: number | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_id?: string
          sale_id?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          client_id: string | null
          country_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          positions_required: number | null
          salary_max: number | null
          salary_min: number | null
          skill_level: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          positions_required?: number | null
          salary_max?: number | null
          salary_min?: number | null
          skill_level?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          positions_required?: number | null
          salary_max?: number | null
          salary_min?: number | null
          skill_level?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      login: {
        Row: {
          created_at: string
          id: string
          password: string
          role: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          password: string
          role: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password?: string
          role?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      mcp_templates: {
        Row: {
          agents_code: string
          created_at: string | null
          crew_code: string
          embedding: string | null
          folder_name: string
          id: string
          main_code: string | null
          metadata: Json
          purpose: string
          readme_content: string | null
          run_agent: string | null
          tasks_code: string
          tools_code: string
          updated_at: string | null
        }
        Insert: {
          agents_code: string
          created_at?: string | null
          crew_code: string
          embedding?: string | null
          folder_name: string
          id?: string
          main_code?: string | null
          metadata?: Json
          purpose: string
          readme_content?: string | null
          run_agent?: string | null
          tasks_code: string
          tools_code: string
          updated_at?: string | null
        }
        Update: {
          agents_code?: string
          created_at?: string | null
          crew_code?: string
          embedding?: string | null
          folder_name?: string
          id?: string
          main_code?: string | null
          metadata?: Json
          purpose?: string
          readme_content?: string | null
          run_agent?: string | null
          tasks_code?: string
          tools_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mcp_tools: {
        Row: {
          config: Json | null
          connection_script: string | null
          created_at: string | null
          embedding: string | null
          example_crew_code: string | null
          folder_name: string
          id: string
          metadata: Json
          purpose: string
          readme_content: string | null
          requirements: string | null
          tool_code: string | null
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          connection_script?: string | null
          created_at?: string | null
          embedding?: string | null
          example_crew_code?: string | null
          folder_name: string
          id?: string
          metadata?: Json
          purpose: string
          readme_content?: string | null
          requirements?: string | null
          tool_code?: string | null
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          connection_script?: string | null
          created_at?: string | null
          embedding?: string | null
          example_crew_code?: string | null
          folder_name?: string
          id?: string
          metadata?: Json
          purpose?: string
          readme_content?: string | null
          requirements?: string | null
          tool_code?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      new_table_name: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: number
          is_active: boolean | null
          name: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: number
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: number
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      pg_manage: {
        Row: {
          created_at: string
          id: number
          name: string | null
          password: string | null
          pg_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          password?: string | null
          pg_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          password?: string | null
          pg_name?: string | null
        }
        Relationships: []
      }
      pg_users: {
        Row: {
          accommodation_id: string | null
          admin_notes: string | null
          budget_max: number | null
          budget_min: number | null
          created_at: string | null
          email: string | null
          id: string
          move_in_date: string | null
          name: string
          phone: string
          room_type_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          accommodation_id?: string | null
          admin_notes?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          move_in_date?: string | null
          name: string
          phone: string
          room_type_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          accommodation_id?: string | null
          admin_notes?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          move_in_date?: string | null
          name?: string
          phone?: string
          room_type_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pg_users_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pg_users_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          flow_data: Json | null
          id: string
          name: string
          starred: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          flow_data?: Json | null
          id?: string
          name: string
          starred?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          flow_data?: Json | null
          id?: string
          name?: string
          starred?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      prompt_versions: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          prompt_id: string
          user_id: string
          variables: Json | null
          version: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          prompt_id: string
          user_id: string
          variables?: Json | null
          version: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          prompt_id?: string
          user_id?: string
          variables?: Json | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_versions_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      prompts: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          project_id: string
          starred: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          project_id: string
          starred?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          project_id?: string
          starred?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      residents: {
        Row: {
          created_at: string
          date_of_birth: string | null
          email: string | null
          gender: string | null
          id: string
          join_date: string
          monthly_rent: number | null
          name: string
          pg_location: string | null
          phone: string
          room_id: string | null
          security_deposit: number | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          join_date?: string
          monthly_rent?: number | null
          name: string
          pg_location?: string | null
          phone: string
          room_id?: string | null
          security_deposit?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          join_date?: string
          monthly_rent?: number | null
          name?: string
          pg_location?: string | null
          phone?: string
          room_id?: string | null
          security_deposit?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "residents_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_types: {
        Row: {
          accommodation_id: string | null
          availability: string
          created_at: string | null
          id: string
          price: number
          type: string
          updated_at: string | null
        }
        Insert: {
          accommodation_id?: string | null
          availability: string
          created_at?: string | null
          id?: string
          price: number
          type: string
          updated_at?: string | null
        }
        Update: {
          accommodation_id?: string | null
          availability?: string
          created_at?: string | null
          id?: string
          price?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_types_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          capacity: number
          created_at: string
          floor: string
          id: string
          occupancy: number
          pg_names: string | null
          rent: number
          room_no: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          capacity: number
          created_at?: string
          floor: string
          id?: string
          occupancy?: number
          pg_names?: string | null
          rent: number
          room_no: string
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          floor?: string
          id?: string
          occupancy?: number
          pg_names?: string | null
          rent?: number
          room_no?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      sales: {
        Row: {
          additional_sale_notes: string | null
          created_at: string
          customer_address: string | null
          customer_id: string | null
          discount: number | null
          exchange_old_phone: boolean | null
          final_amount: number
          id: string
          imei_serial: string | null
          inventory_id: string | null
          payment_method: string
          sale_date: string
          sale_id: string
          sale_price: number
          status: string
          updated_at: string
        }
        Insert: {
          additional_sale_notes?: string | null
          created_at?: string
          customer_address?: string | null
          customer_id?: string | null
          discount?: number | null
          exchange_old_phone?: boolean | null
          final_amount: number
          id?: string
          imei_serial?: string | null
          inventory_id?: string | null
          payment_method: string
          sale_date?: string
          sale_id: string
          sale_price: number
          status?: string
          updated_at?: string
        }
        Update: {
          additional_sale_notes?: string | null
          created_at?: string
          customer_address?: string | null
          customer_id?: string | null
          discount?: number | null
          exchange_old_phone?: boolean | null
          final_amount?: number
          id?: string
          imei_serial?: string | null
          inventory_id?: string | null
          payment_method?: string
          sale_date?: string
          sale_id?: string
          sale_price?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
        ]
      }
      site_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      svg_storage: {
        Row: {
          content: string
          created_at: string | null
          data_url: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          data_url?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          data_url?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ticket_comments: {
        Row: {
          comment: string
          created_at: string
          created_by: string
          id: string
          ticket_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          created_by: string
          id?: string
          ticket_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          created_by?: string
          id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_comments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string
          description: string | null
          expected_date: string | null
          id: string
          priority: string
          status: string
          submitter_email: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category: string
          created_at?: string
          description?: string | null
          expected_date?: string | null
          id?: string
          priority?: string
          status?: string
          submitter_email: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          description?: string | null
          expected_date?: string | null
          id?: string
          priority?: string
          status?: string
          submitter_email?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          customer_id: string | null
          id: string
          inventory_id: string | null
          quantity: number
          supplier_id: string | null
          transaction_date: string
          transaction_id: string
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          customer_id?: string | null
          id?: string
          inventory_id?: string | null
          quantity?: number
          supplier_id?: string | null
          transaction_date?: string
          transaction_id: string
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          customer_id?: string | null
          id?: string
          inventory_id?: string | null
          quantity?: number
          supplier_id?: string | null
          transaction_date?: string
          transaction_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          id: number
          password: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          password?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          password?: string | null
          username?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      blog_posts_with_details: {
        Row: {
          author_avatar: string | null
          author_bio: string | null
          author_email: string | null
          author_name: string | null
          author_title: string | null
          category_color: string | null
          category_icon: string | null
          category_name: string | null
          category_slug: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image: string | null
          id: number | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          read_time: number | null
          slug: string | null
          status: string | null
          tags: Json | null
          title: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      career_applications_summary: {
        Row: {
          latest_application: string | null
          position_applied: string | null
          reviewing_count: number | null
          selected_count: number | null
          shortlisted_count: number | null
          submitted_count: number | null
          total_applications: number | null
        }
        Relationships: []
      }
      contact_submissions_summary: {
        Row: {
          count: number | null
          date: string | null
          status: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      archive_task: {
        Args: { archived_by_param?: string; task_id_param: string }
        Returns: boolean
      }
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      get_next_prompt_version: {
        Args: { p_prompt_id: string }
        Returns: number
      }
      get_next_version: {
        Args: { p_project_id: string }
        Returns: number
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_agent_patterns: {
        Args: {
          filter_object?: Json
          match_count?: number
          query_embedding: string
        }
        Returns: {
          agent_code: string
          agent_name: string
          agent_type: string
          complexity_level: number
          metadata: Json
          purpose: string
          similarity: number
          tags: string[]
          tools_code: string
          uuid: string
        }[]
      }
      match_agent_templates: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          agents_code: string
          crew_code: string
          folder_name: string
          id: number
          metadata: Json
          purpose: string
          similarity: number
          tasks_code: string
          tools_code: string
        }[]
      }
      match_archon_code_examples: {
        Args: {
          filter?: Json
          match_count?: number
          query_embedding: string
          source_filter?: string
        }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          source_id: string
          summary: string
          url: string
        }[]
      }
      match_archon_crawled_pages: {
        Args: {
          filter?: Json
          match_count?: number
          query_embedding: string
          source_filter?: string
        }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          source_id: string
          url: string
        }[]
      }
      match_custom_templates: {
        Args: {
          filter_object?: Json
          match_count?: number
          query_embedding: string
        }
        Returns: {
          categories: string[]
          dependencies: string[]
          description: string
          difficulty_level: number
          extra_data: Json
          setup_code: string
          similarity: number
          template_code: string
          template_id: number
          template_name: string
          template_type: string
        }[]
      }
      match_mcp_templates: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          folder_name: string
          id: string
          metadata: Json
          purpose: string
          similarity: number
        }[]
      }
      match_mcp_tools: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          config: Json
          connection_script: string
          embedding: string
          example_crew_code: string
          folder_name: string
          id: string
          metadata: Json
          purpose: string
          readme_content: string
          requirements: string
          similarity: number
          tool_code: string
        }[]
      }
      match_site_pages: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          url: string
        }[]
      }
      new_function_name: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          url: string
        }[]
      }
      search_agent_embeddings: {
        Args: {
          match_count?: number
          query_embedding: string
          similarity_threshold?: number
        }
        Returns: {
          folder_name: string
          id: number
          metadata: Json
          purpose: string
          similarity: number
        }[]
      }
      search_agents_by_text: {
        Args: { search_query: string }
        Returns: {
          agent_name: string
          agent_type: string
          id: string
          purpose: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      task_status: "todo" | "doing" | "review" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      task_status: ["todo", "doing", "review", "done"],
    },
  },
} as const
