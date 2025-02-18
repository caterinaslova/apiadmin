import z from "zod";
export declare const SearchSchema: z.ZodString;
export declare const SortColorSchema: z.ZodEnum<["codigoColor", "-codigoColor", "nombreColor", "-nombreColor"]>;
export declare const SortCategoriaSchema: z.ZodEnum<["ordenEnMenu", "-ordenEnMenu", "nombreCategoria", "-nombreCategoria", "tipoCategoria", "-tipoCategoria"]>;
