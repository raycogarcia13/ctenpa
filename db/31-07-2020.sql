PGDMP     %    	                x           ctv1    12.3 (Debian 12.3-1.pgdg90+1)    12.3 (Debian 12.3-1.pgdg100+1)    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24576    ctv1    DATABASE     b   CREATE DATABASE ctv1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE ctv1;
                postgres    false            e           1247    24579    cierrep    TYPE       CREATE TYPE public.cierrep AS (
	codigo character varying,
	nombrep character varying,
	nombret text,
	acumulado double precision,
	produccionb numeric(10,2),
	produccionm numeric(10,2),
	produccionc numeric(10,2),
	mes integer,
	anno integer,
	id integer
);
    DROP TYPE public.cierrep;
       public          postgres    false                       1255    24580 &   calculosuma(integer, integer, integer)    FUNCTION     �  CREATE FUNCTION public.calculosuma(idt integer, mesa integer, annoa integer) RETURNS real
    LANGUAGE plpgsql
    AS $$
declare cantP integer :=0;
 		horas real :=0;
BEGIN
	select count(id)  into cantP from cierre_proyectista 
		where "TrabajadorId"=idT and anno=annoA and mes=mesA;  
		
	SELECT  acumulado_actividades into horas
	FROM public.cierre_actividadesproductivas
	where "TrabajadorId"=idT and anno=annoA and mes=mesA;  
	
 RETURN horas/cantP;
END;
$$;
 L   DROP FUNCTION public.calculosuma(idt integer, mesa integer, annoa integer);
       public          postgres    false                       1255    24581    f_cierreproyecto()    FUNCTION     �  CREATE FUNCTION public.f_cierreproyecto() RETURNS SETOF public.cierrep
    LANGUAGE plpgsql
    AS $$	
	BEGIN	
	RETURN QUERY SELECT proyectos.codigo,proyectos.nombre, trabajador.nombre||' '||trabajador.apellidos, acumulado_obras,cierre_proyecto.produccion_bruta,cierre_proyecto.produccion_mercantil,cierre_proyecto.produccion_cuc,cierre_proyecto.mes,cierre_proyecto.anno,cierre_proyecto.id 
	
	FROM public.cierre_proyectista  inner join trabajador on cierre_proyectista."TrabajadorId"=trabajador.id
	inner join sub_proyecto on cierre_proyectista."SubProyectoId"=sub_proyecto.id
	inner join proyectos on sub_proyecto."ProyectoId"=proyectos.id inner join cierre_proyecto on  proyectos.id=cierre_proyecto."ProyectoId";
	--group by proyectos.codigo,proyectos.nombre, trabajador.nombre||' '||trabajador.apellidos, acumulado_obras,cierre_proyecto.produccion_bruta,cierre_proyecto.produccion_mercantil,cierre_proyecto.produccion_cuc,cierre_proyecto.mes,cierre_proyecto.anno,cierre_proyecto.id;
	
	END; 
	$$;
 )   DROP FUNCTION public.f_cierreproyecto();
       public          postgres    false    613                       1255    24582    f_cierreproyectomio()    FUNCTION     @  CREATE FUNCTION public.f_cierreproyectomio() RETURNS TABLE(proyectid integer, codigo character varying, nombrep character varying, nombret text, acumulado double precision, produccionb numeric, produccionm numeric, produccionc numeric, mes integer, anno integer, id integer, idtrabajador integer)
    LANGUAGE plpgsql
    AS $$  
declare cant integer :=5;
	BEGIN	
	RETURN QUERY SELECT  proyectos.id as proyectId, 
	proyectos.codigo,proyectos.nombre, 
	trabajador.nombre||' '||trabajador.apellidos,
	acumulado_obras,
	cierre_proyecto.produccion_bruta,
	cierre_proyecto.produccion_mercantil,
	cierre_proyecto.produccion_cuc,
	cierre_proyecto.mes,
	cierre_proyecto.anno,
	cierre_proyecto.id,
	cierre_proyectista."TrabajadorId"
	
	FROM public.cierre_proyectista  inner join trabajador on cierre_proyectista."TrabajadorId"=trabajador.id
	inner join sub_proyecto on cierre_proyectista."SubProyectoId"=sub_proyecto.id
	inner join proyectos on sub_proyecto."ProyectoId"=proyectos.id inner join cierre_proyecto on  proyectos.id=cierre_proyecto."ProyectoId"
	ORDER by "TrabajadorId";
	
	END; 
	$$;
 ,   DROP FUNCTION public.f_cierreproyectomio();
       public          postgres    false                       1255    25006    ftg_calculoprod_acumulada()    FUNCTION     +  CREATE FUNCTION public.ftg_calculoprod_acumulada() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare acumulada_anterior real :=0;
declare tmp integer :=0 ;
BEGIN
    select max(id) into tmp from public.cierre where produccion_acumulada !=0 AND codigo=old.codigo;
	if tmp!=0 then
		select produccion_acumulada into acumulada_anterior from public.cierre where id=tmp;	
	end if;
	raise notice 'acumul: %',acumulada_anterior;
	raise notice 'id: %',tmp;
	
	if old.produccion_acumulada != 0 then
	UPDATE public.cierre
			SET  produccion_acumulada = produccion_acumulada + (new.produccion_mercantil - old.produccion_mercantil)
			WHERE id=old.id;
		
			
	else
		UPDATE public.cierre
			SET  produccion_acumulada = acumulada_anterior + new.produccion_mercantil
			WHERE id=old.id;
	end if;
	
	RETURN new;
END;
$$;
 2   DROP FUNCTION public.ftg_calculoprod_acumulada();
       public          postgres    false                       1255    24583    ftg_cierreactividades()    FUNCTION     �  CREATE FUNCTION public.ftg_cierreactividades() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare tmp integer :=0;
declare tmp1 boolean :=false;

BEGIN
	SELECT productiva into tmp1
		FROM public.actividades
		where id=new."ActividadeId";
   	
	
IF tmp1 = TRUE THEN	
	SELECT id into tmp from public.cierre_actividadesproductivas 
			where anno=new.anno AND mes=new.mes 	
			AND "TrabajadorId"=new."TrabajadorId";	
			
	IF TG_OP = 'INSERT'  then	 
		IF tmp!=0 then					
			UPDATE public.cierre_actividadesproductivas
				SET  acumulado_actividades=acumulado_actividades + new.tiempo
				WHERE id=tmp;				
		ELSE 			
				INSERT INTO public.cierre_actividadesproductivas(
					id, anno, mes, acumulado_actividades, "TrabajadorId")
					VALUES (default,new.anno, new.mes, new.tiempo,new."TrabajadorId");					
		END If;
	ELSE 	    
			UPDATE public.cierre_actividadesproductivas
				SET  acumulado_actividades=acumulado_actividades + (new.tiempo - old.tiempo)
				WHERE id=tmp;				
	END IF;
ELSE 
	SELECT id into tmp from public.cierre_actividadesnoproductivas 
		where anno=new.anno AND mes=new.mes 	
		AND "TrabajadorId"=new."TrabajadorId";	
		
	IF TG_OP = 'INSERT'  then	 
		IF tmp!=0 then					
			UPDATE public.cierre_actividadesnoproductivas
				SET  acumulado_actividades=acumulado_actividades + new.tiempo
				WHERE id=tmp;				
		ELSE 			
				INSERT INTO public.cierre_actividadesnoproductivas(
					id, anno, mes, acumulado_actividades, "TrabajadorId")
					VALUES (default,new.anno, new.mes, new.tiempo,new."TrabajadorId");					
		END If;
	ELSE 	    
			UPDATE public.cierre_actividadesnoproductivas
				SET  acumulado_actividades=acumulado_actividades + (new.tiempo - old.tiempo)
				WHERE id=tmp;				
	END IF;	
END IF;	
	RETURN new;
END;
$$;
 .   DROP FUNCTION public.ftg_cierreactividades();
       public          postgres    false                        1255    24584    ftg_cierreproyectista()    FUNCTION     D  CREATE FUNCTION public.ftg_cierreproyectista() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare tmp integer :=0 ;

BEGIN
   
	select id into tmp from cierre_proyectista 
		where anno=new.anno AND mes=new.mes 
		AND "SubProyectoId"=new."SubProyectoId" 
		AND "TrabajadorId"=new."TrabajadorId";	
		
	IF TG_OP = 'INSERT' then
		IF tmp!=0 then	
			UPDATE public.cierre_proyectista
				SET  acumulado_obras=acumulado_obras + new.tiempo
				WHERE id=tmp;		
		ELSE 
			INSERT INTO public.cierre_proyectista(
				id, anno, mes, acumulado_obras, "SubProyectoId", "TrabajadorId")
				VALUES (default,new.anno, new.mes, new.tiempo,new."SubProyectoId",new."TrabajadorId");
		END If;
	ELSE 
		UPDATE public.cierre_proyectista
			SET  acumulado_obras=acumulado_obras + (new.tiempo - old.tiempo)
			WHERE id=tmp;
	END IF;

	RETURN new;
END;
$$;
 .   DROP FUNCTION public.ftg_cierreproyectista();
       public          postgres    false            !           1255    24585    ftg_cierreproyecto()    FUNCTION     �  CREATE FUNCTION public.ftg_cierreproyecto() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare tmp integer :=0 ;
declare tmp1 integer :=0 ;
BEGIN
    select "ProyectoId" into tmp1 from sub_proyecto where id=new."SubProyectoId";	
	select id into tmp from cierre_proyecto where anno=new.anno AND mes=new.mes AND "ProyectoId"=tmp1;	
	IF TG_OP = 'INSERT' then
		IF tmp!=0 then	
			UPDATE public.cierre_proyecto
				SET  horas_acumuladas=horas_acumuladas + new.acumulado_obras
				WHERE id=tmp;		
		ELSE 
			INSERT INTO public.cierre_proyecto(
				id, mes, anno, horas_acumuladas, produccion_bruta, produccion_mercantil, produccion_cuc, "ProyectoId")
				VALUES (default,new.mes, new.anno, new.acumulado_obras,0,0,0, tmp1);
		END If;
	ELSE 
		UPDATE public.cierre_proyecto
			SET  horas_acumuladas=horas_acumuladas + (new.acumulado_obras - old.acumulado_obras)
			WHERE id=tmp;
	END IF;

	RETURN new;
END;
$$;
 +   DROP FUNCTION public.ftg_cierreproyecto();
       public          postgres    false            "           1255    24587    ftg_totalhorasactividades()    FUNCTION       CREATE FUNCTION public.ftg_totalhorasactividades() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare tmp integer :=0 ;      
BEGIN
	select id into tmp from cierre_actividades where anno=new.anno AND mes=new.mes AND "ActividadeId"=new."ActividadeId";
	
	IF tmp!=0 then
	
		UPDATE public.cierre_actividades
			SET  acumulado_actividades=acumulado_actividades + new.tiempo
			WHERE id=tmp;
		
	ELSE 
		INSERT INTO public.cierre_actividades(
			id, anno, mes, acumulado_actividades, "ActividadeId", "TrabajadorId")
			VALUES (default, new.anno, new.mes, new.tiempo, new."ActividadeId", new."TrabajadorId");
	END If;
	RETURN new;
END;
$$;
 2   DROP FUNCTION public.ftg_totalhorasactividades();
       public          postgres    false            #           1255    24588 #   proratea(integer, integer, integer)    FUNCTION     �  CREATE FUNCTION public.proratea(idt integer, mesa integer, annoa integer) RETURNS real
    LANGUAGE plpgsql
    AS $$
declare cantP integer :=0;
 		horas integer :=0;
BEGIN
	select count(id)  into cantP from cierre_proyectista 
		where "TrabajadorId"=idT and anno=mesA and mes=annoA;  
		
	SELECT  acumulado_actividades into horas
	FROM public.cierre_actividadesproductivas
	where "TrabajadorId"=idT and anno=mesA and mes=annoA;
	
 RETURN horas/cantP;
END;
$$;
 I   DROP FUNCTION public.proratea(idt integer, mesa integer, annoa integer);
       public          postgres    false            �            1259    24589    actividades    TABLE     �   CREATE TABLE public.actividades (
    id integer NOT NULL,
    actividad character varying(255) NOT NULL,
    tiempo_d double precision,
    pro_ratea character varying(255),
    productiva boolean
);
    DROP TABLE public.actividades;
       public         heap    postgres    false            �            1259    24592    actividades_id_seq    SEQUENCE     �   CREATE SEQUENCE public.actividades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.actividades_id_seq;
       public          postgres    false    203            �           0    0    actividades_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.actividades_id_seq OWNED BY public.actividades.id;
          public          postgres    false    204            �            1259    24594    area    TABLE     �   CREATE TABLE public.area (
    id integer NOT NULL,
    codigo character varying(255) NOT NULL,
    nombre character varying(255) NOT NULL,
    "EmpresaId" integer NOT NULL
);
    DROP TABLE public.area;
       public         heap    postgres    false            �            1259    24597    area_id_seq    SEQUENCE     �   CREATE SEQUENCE public.area_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.area_id_seq;
       public          postgres    false    205            �           0    0    area_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.area_id_seq OWNED BY public.area.id;
          public          postgres    false    206            �            1259    24599 
   asignacion    TABLE     q   CREATE TABLE public.asignacion (
    id integer NOT NULL,
    "EquipoId" integer,
    "SubProyectoId" integer
);
    DROP TABLE public.asignacion;
       public         heap    postgres    false            �            1259    24602    asignacion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.asignacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.asignacion_id_seq;
       public          postgres    false    207            �           0    0    asignacion_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.asignacion_id_seq OWNED BY public.asignacion.id;
          public          postgres    false    208            �            1259    24604 	   auditoria    TABLE     I  CREATE TABLE public.auditoria (
    id integer NOT NULL,
    ip character varying(255) NOT NULL,
    action character varying(255),
    metodo character varying(255) NOT NULL,
    qry character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    nombre character varying(255) NOT NULL,
    "UsuarioId" integer
);
    DROP TABLE public.auditoria;
       public         heap    postgres    false            �            1259    24607    auditoria_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auditoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auditoria_id_seq;
       public          postgres    false    209            �           0    0    auditoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auditoria_id_seq OWNED BY public.auditoria.id;
          public          postgres    false    210            �            1259    24609    cantp    TABLE     0   CREATE TABLE public.cantp (
    count bigint
);
    DROP TABLE public.cantp;
       public         heap    postgres    false            �            1259    24612    cargo    TABLE     b   CREATE TABLE public.cargo (
    id integer NOT NULL,
    cargo character varying(255) NOT NULL
);
    DROP TABLE public.cargo;
       public         heap    postgres    false            �            1259    24615    cargo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cargo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.cargo_id_seq;
       public          postgres    false    212            �           0    0    cargo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cargo_id_seq OWNED BY public.cargo.id;
          public          postgres    false    213            �            1259    24617    cierre    TABLE       CREATE TABLE public.cierre (
    id integer NOT NULL,
    codigo character varying(255) NOT NULL,
    nombre character varying(255) NOT NULL,
    anno integer NOT NULL,
    produccion_bruta numeric(10,2) NOT NULL,
    produccion_acumulada numeric(10,2) NOT NULL,
    produccion_mercantil numeric(10,2) NOT NULL,
    produccion_cuc numeric(10,2) NOT NULL,
    mes integer NOT NULL
);
    DROP TABLE public.cierre;
       public         heap    postgres    false            �            1259    24620    cierre_actividades    TABLE     �   CREATE TABLE public.cierre_actividades (
    id integer NOT NULL,
    anno integer NOT NULL,
    mes integer NOT NULL,
    acumulado_actividades double precision NOT NULL,
    "ActividadeId" integer,
    "TrabajadorId" integer
);
 &   DROP TABLE public.cierre_actividades;
       public         heap    postgres    false            �            1259    24623    cierre_actividades_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cierre_actividades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.cierre_actividades_id_seq;
       public          postgres    false    215            �           0    0    cierre_actividades_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.cierre_actividades_id_seq OWNED BY public.cierre_actividades.id;
          public          postgres    false    216            �            1259    24625    cierre_actividadesnoproductivas    TABLE     �   CREATE TABLE public.cierre_actividadesnoproductivas (
    id integer NOT NULL,
    anno integer NOT NULL,
    mes integer NOT NULL,
    acumulado_actividades double precision NOT NULL,
    "TrabajadorId" integer
);
 3   DROP TABLE public.cierre_actividadesnoproductivas;
       public         heap    postgres    false            �            1259    24628 &   cierre_actividadesnoproductivas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cierre_actividadesnoproductivas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.cierre_actividadesnoproductivas_id_seq;
       public          postgres    false    217            �           0    0 &   cierre_actividadesnoproductivas_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.cierre_actividadesnoproductivas_id_seq OWNED BY public.cierre_actividadesnoproductivas.id;
          public          postgres    false    218            �            1259    24630    cierre_actividadesproductivas    TABLE     �   CREATE TABLE public.cierre_actividadesproductivas (
    id integer NOT NULL,
    anno integer NOT NULL,
    mes integer NOT NULL,
    acumulado_actividades double precision NOT NULL,
    "TrabajadorId" integer
);
 1   DROP TABLE public.cierre_actividadesproductivas;
       public         heap    postgres    false            �            1259    24633 $   cierre_actividadesproductivas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cierre_actividadesproductivas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.cierre_actividadesproductivas_id_seq;
       public          postgres    false    219            �           0    0 $   cierre_actividadesproductivas_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.cierre_actividadesproductivas_id_seq OWNED BY public.cierre_actividadesproductivas.id;
          public          postgres    false    220            �            1259    24635    cierre_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cierre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.cierre_id_seq;
       public          postgres    false    214            �           0    0    cierre_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.cierre_id_seq OWNED BY public.cierre.id;
          public          postgres    false    221            �            1259    24637    cierre_proyectista    TABLE     �   CREATE TABLE public.cierre_proyectista (
    id integer NOT NULL,
    anno integer NOT NULL,
    mes integer NOT NULL,
    acumulado_obras double precision NOT NULL,
    "SubProyectoId" integer NOT NULL,
    "TrabajadorId" integer NOT NULL
);
 &   DROP TABLE public.cierre_proyectista;
       public         heap    postgres    false            �            1259    24640    cierre_proyectista_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cierre_proyectista_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.cierre_proyectista_id_seq;
       public          postgres    false    222            �           0    0    cierre_proyectista_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.cierre_proyectista_id_seq OWNED BY public.cierre_proyectista.id;
          public          postgres    false    223            �            1259    24642    cierre_proyecto    TABLE     O  CREATE TABLE public.cierre_proyecto (
    id integer NOT NULL,
    mes integer NOT NULL,
    anno integer NOT NULL,
    horas_acumuladas numeric(10,2) NOT NULL,
    produccion_bruta numeric(10,2) NOT NULL,
    produccion_mercantil numeric(10,2) NOT NULL,
    produccion_cuc numeric(10,2) NOT NULL,
    "ProyectoId" integer NOT NULL
);
 #   DROP TABLE public.cierre_proyecto;
       public         heap    postgres    false            �            1259    24645    cierre_proyecto_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cierre_proyecto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cierre_proyecto_id_seq;
       public          postgres    false    224            �           0    0    cierre_proyecto_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cierre_proyecto_id_seq OWNED BY public.cierre_proyecto.id;
          public          postgres    false    225            �            1259    24647    cliente    TABLE     �   CREATE TABLE public.cliente (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    programa character varying(255) NOT NULL
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    24650    cliente_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.cliente_id_seq;
       public          postgres    false    226            �           0    0    cliente_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;
          public          postgres    false    227            �            1259    24652 	   contratos    TABLE       CREATE TABLE public.contratos (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    numero integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_cierre date NOT NULL,
    codigo_tratos integer,
    activo boolean DEFAULT false,
    "ClienteId" integer
);
    DROP TABLE public.contratos;
       public         heap    postgres    false            �            1259    24655    contratos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contratos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.contratos_id_seq;
       public          postgres    false    228            �           0    0    contratos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.contratos_id_seq OWNED BY public.contratos.id;
          public          postgres    false    229            �            1259    24657    control_actividades    TABLE     �   CREATE TABLE public.control_actividades (
    id integer NOT NULL,
    dia integer,
    mes integer NOT NULL,
    anno integer NOT NULL,
    tiempo double precision NOT NULL,
    "TrabajadorId" integer,
    "ActividadeId" integer
);
 '   DROP TABLE public.control_actividades;
       public         heap    postgres    false            �            1259    24660    control_actividades_id_seq    SEQUENCE     �   CREATE SEQUENCE public.control_actividades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.control_actividades_id_seq;
       public          postgres    false    230            �           0    0    control_actividades_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.control_actividades_id_seq OWNED BY public.control_actividades.id;
          public          postgres    false    231            �            1259    24662    control_obra    TABLE     �   CREATE TABLE public.control_obra (
    id integer NOT NULL,
    dia integer NOT NULL,
    mes integer NOT NULL,
    anno integer NOT NULL,
    tiempo double precision NOT NULL,
    "TrabajadorId" integer,
    "SubProyectoId" integer
);
     DROP TABLE public.control_obra;
       public         heap    postgres    false            �            1259    24665    control_obra_id_seq    SEQUENCE     �   CREATE SEQUENCE public.control_obra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.control_obra_id_seq;
       public          postgres    false    232            �           0    0    control_obra_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.control_obra_id_seq OWNED BY public.control_obra.id;
          public          postgres    false    233            �            1259    24667    denominaciones    TABLE     �   CREATE TABLE public.denominaciones (
    id integer NOT NULL,
    denominacion character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL
);
 "   DROP TABLE public.denominaciones;
       public         heap    postgres    false            �            1259    24670    denominaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.denominaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.denominaciones_id_seq;
       public          postgres    false    234            �           0    0    denominaciones_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.denominaciones_id_seq OWNED BY public.denominaciones.id;
          public          postgres    false    235            �            1259    24672    empresa    TABLE     7  CREATE TABLE public.empresa (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    objeto character varying(255) NOT NULL,
    mision character varying(255) NOT NULL,
    vision character varying(255) NOT NULL,
    telefono integer NOT NULL
);
    DROP TABLE public.empresa;
       public         heap    postgres    false            �            1259    24675    empresa_id_seq    SEQUENCE     �   CREATE SEQUENCE public.empresa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.empresa_id_seq;
       public          postgres    false    236            �           0    0    empresa_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.empresa_id_seq OWNED BY public.empresa.id;
          public          postgres    false    237            �            1259    24677    equipo    TABLE     �   CREATE TABLE public.equipo (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    codigo character varying(255) NOT NULL
);
    DROP TABLE public.equipo;
       public         heap    postgres    false            �            1259    24680    equipo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.equipo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.equipo_id_seq;
       public          postgres    false    238            �           0    0    equipo_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.equipo_id_seq OWNED BY public.equipo.id;
          public          postgres    false    239            �            1259    24682    escalas    TABLE     �   CREATE TABLE public.escalas (
    id integer NOT NULL,
    escala numeric(10,2) NOT NULL,
    fecha timestamp with time zone NOT NULL,
    "CargoId" integer
);
    DROP TABLE public.escalas;
       public         heap    postgres    false            �            1259    24685    escalas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.escalas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.escalas_id_seq;
       public          postgres    false    240            �           0    0    escalas_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.escalas_id_seq OWNED BY public.escalas.id;
          public          postgres    false    241            �            1259    24687    especialidad    TABLE     �   CREATE TABLE public.especialidad (
    id integer NOT NULL,
    especialidad character varying(255) NOT NULL,
    codigo character varying(255)
);
     DROP TABLE public.especialidad;
       public         heap    postgres    false            �            1259    24690    especialidad_id_seq    SEQUENCE     �   CREATE SEQUENCE public.especialidad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.especialidad_id_seq;
       public          postgres    false    242            �           0    0    especialidad_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.especialidad_id_seq OWNED BY public.especialidad.id;
          public          postgres    false    243            �            1259    24692    estados    TABLE     �   CREATE TABLE public.estados (
    id integer NOT NULL,
    estado character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL
);
    DROP TABLE public.estados;
       public         heap    postgres    false            �            1259    24695    estados_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.estados_id_seq;
       public          postgres    false    244            �           0    0    estados_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.estados_id_seq OWNED BY public.estados.id;
          public          postgres    false    245            �            1259    24697    f    TABLE     ,   CREATE TABLE public.f (
    count bigint
);
    DROP TABLE public.f;
       public         heap    postgres    false            �            1259    24700    factura_subp    TABLE     �   CREATE TABLE public.factura_subp (
    id integer NOT NULL,
    valor numeric(10,2),
    valor_cuc numeric(10,2),
    "SubProyectoId" integer
);
     DROP TABLE public.factura_subp;
       public         heap    postgres    false            �            1259    24703    factura_subp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.factura_subp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.factura_subp_id_seq;
       public          postgres    false    247            �           0    0    factura_subp_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.factura_subp_id_seq OWNED BY public.factura_subp.id;
          public          postgres    false    248            �            1259    24705    feriados    TABLE     �   CREATE TABLE public.feriados (
    id integer NOT NULL,
    fecha timestamp with time zone NOT NULL,
    motivo character varying(255) NOT NULL
);
    DROP TABLE public.feriados;
       public         heap    postgres    false            �            1259    24708    feriados_id_seq    SEQUENCE     �   CREATE SEQUENCE public.feriados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.feriados_id_seq;
       public          postgres    false    249            �           0    0    feriados_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.feriados_id_seq OWNED BY public.feriados.id;
          public          postgres    false    250            �            1259    24710    integrantes    TABLE     �   CREATE TABLE public.integrantes (
    id integer NOT NULL,
    funcion character varying(255),
    "AsignacionId" integer,
    "TrabajadorId" integer
);
    DROP TABLE public.integrantes;
       public         heap    postgres    false            �            1259    24713    integrantes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.integrantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.integrantes_id_seq;
       public          postgres    false    251            �           0    0    integrantes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.integrantes_id_seq OWNED BY public.integrantes.id;
          public          postgres    false    252            �            1259    24715    produccion_anual    TABLE     �   CREATE TABLE public.produccion_anual (
    id integer NOT NULL,
    anno integer NOT NULL,
    plan numeric(10,2) NOT NULL,
    salario_medio numeric(10,2) NOT NULL,
    "EmpresaId" integer
);
 $   DROP TABLE public.produccion_anual;
       public         heap    postgres    false            �            1259    24718    produccion_anual_id_seq    SEQUENCE     �   CREATE SEQUENCE public.produccion_anual_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.produccion_anual_id_seq;
       public          postgres    false    253            �           0    0    produccion_anual_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.produccion_anual_id_seq OWNED BY public.produccion_anual.id;
          public          postgres    false    254            �            1259    24720    produccion_mes    TABLE     :  CREATE TABLE public.produccion_mes (
    id integer NOT NULL,
    mes character varying(255) NOT NULL,
    anno integer NOT NULL,
    plan numeric(10,2) NOT NULL,
    plan_real numeric(10,2) NOT NULL,
    salario_mensual numeric(10,2) NOT NULL,
    horas_mensual double precision NOT NULL,
    "AreaId" integer
);
 "   DROP TABLE public.produccion_mes;
       public         heap    postgres    false                        1259    24723    produccion_mes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.produccion_mes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.produccion_mes_id_seq;
       public          postgres    false    255            �           0    0    produccion_mes_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.produccion_mes_id_seq OWNED BY public.produccion_mes.id;
          public          postgres    false    256                       1259    24725 	   proyectos    TABLE     8  CREATE TABLE public.proyectos (
    id integer NOT NULL,
    codigo character varying(255) NOT NULL,
    nombre character varying(255) NOT NULL,
    valor_total double precision NOT NULL,
    descripcion character varying(255) NOT NULL,
    terminado boolean,
    "ContratoId" integer,
    "EstadoId" integer
);
    DROP TABLE public.proyectos;
       public         heap    postgres    false                       1259    24728    proyectos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.proyectos_id_seq;
       public          postgres    false    257            �           0    0    proyectos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;
          public          postgres    false    258                       1259    24730    rol    TABLE     �   CREATE TABLE public.rol (
    id integer NOT NULL,
    rol character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.rol;
       public         heap    postgres    false                       1259    24733 
   rol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.rol_id_seq;
       public          postgres    false    259            �           0    0 
   rol_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;
          public          postgres    false    260                       1259    24735    salario    TABLE       CREATE TABLE public.salario (
    id integer NOT NULL,
    mes character varying(255) NOT NULL,
    anno integer NOT NULL,
    salario numeric(10,2) NOT NULL,
    salario_descuento numeric(10,2) NOT NULL,
    salario_resultado numeric(10,2) NOT NULL,
    "TrabajadorId" integer
);
    DROP TABLE public.salario;
       public         heap    postgres    false                       1259    24738    salario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.salario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.salario_id_seq;
       public          postgres    false    261            �           0    0    salario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.salario_id_seq OWNED BY public.salario.id;
          public          postgres    false    262                       1259    24740    sub_proyecto    TABLE       CREATE TABLE public.sub_proyecto (
    id integer NOT NULL,
    codigo character varying(255) NOT NULL,
    sub_valor numeric(10,2) NOT NULL,
    descripcion character varying(255) NOT NULL,
    terminado boolean,
    "ProyectoId" integer,
    "AreaId" integer
);
     DROP TABLE public.sub_proyecto;
       public         heap    postgres    false                       1259    24743    sub_proyecto_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sub_proyecto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.sub_proyecto_id_seq;
       public          postgres    false    263            �           0    0    sub_proyecto_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.sub_proyecto_id_seq OWNED BY public.sub_proyecto.id;
          public          postgres    false    264            	           1259    24745    temporal    TABLE     �   CREATE TABLE public.temporal (
    id integer NOT NULL,
    codigo character varying(255) NOT NULL,
    valor double precision NOT NULL
);
    DROP TABLE public.temporal;
       public         heap    postgres    false            
           1259    24748    temporal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.temporal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.temporal_id_seq;
       public          postgres    false    265            �           0    0    temporal_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.temporal_id_seq OWNED BY public.temporal.id;
          public          postgres    false    266                       1259    24750 
   trabajador    TABLE     �  CREATE TABLE public.trabajador (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    perfec_empresarial double precision NOT NULL,
    coeficiente double precision NOT NULL,
    salario_basico double precision,
    salario_hora double precision NOT NULL,
    "EspecialidadId" integer,
    "CargoId" integer,
    "AreaId" integer,
    "DenominacioneId" integer,
    "UsuarioId" integer
);
    DROP TABLE public.trabajador;
       public         heap    postgres    false                       1259    24753    trabajador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trabajador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.trabajador_id_seq;
       public          postgres    false    267            �           0    0    trabajador_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.trabajador_id_seq OWNED BY public.trabajador.id;
          public          postgres    false    268                       1259    24755    usuario    TABLE       CREATE TABLE public.usuario (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    descripcion character varying(255),
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "RolId" integer NOT NULL,
    "AreaId" integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false                       1259    24758    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    269            �           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    270            �           2604    24760    actividades id    DEFAULT     p   ALTER TABLE ONLY public.actividades ALTER COLUMN id SET DEFAULT nextval('public.actividades_id_seq'::regclass);
 =   ALTER TABLE public.actividades ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203            �           2604    24761    area id    DEFAULT     b   ALTER TABLE ONLY public.area ALTER COLUMN id SET DEFAULT nextval('public.area_id_seq'::regclass);
 6   ALTER TABLE public.area ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205            �           2604    24762    asignacion id    DEFAULT     n   ALTER TABLE ONLY public.asignacion ALTER COLUMN id SET DEFAULT nextval('public.asignacion_id_seq'::regclass);
 <   ALTER TABLE public.asignacion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207            �           2604    24763    auditoria id    DEFAULT     l   ALTER TABLE ONLY public.auditoria ALTER COLUMN id SET DEFAULT nextval('public.auditoria_id_seq'::regclass);
 ;   ALTER TABLE public.auditoria ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209            �           2604    24764    cargo id    DEFAULT     d   ALTER TABLE ONLY public.cargo ALTER COLUMN id SET DEFAULT nextval('public.cargo_id_seq'::regclass);
 7   ALTER TABLE public.cargo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            �           2604    24765 	   cierre id    DEFAULT     f   ALTER TABLE ONLY public.cierre ALTER COLUMN id SET DEFAULT nextval('public.cierre_id_seq'::regclass);
 8   ALTER TABLE public.cierre ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    214            �           2604    24766    cierre_actividades id    DEFAULT     ~   ALTER TABLE ONLY public.cierre_actividades ALTER COLUMN id SET DEFAULT nextval('public.cierre_actividades_id_seq'::regclass);
 D   ALTER TABLE public.cierre_actividades ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    24767 "   cierre_actividadesnoproductivas id    DEFAULT     �   ALTER TABLE ONLY public.cierre_actividadesnoproductivas ALTER COLUMN id SET DEFAULT nextval('public.cierre_actividadesnoproductivas_id_seq'::regclass);
 Q   ALTER TABLE public.cierre_actividadesnoproductivas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    24768     cierre_actividadesproductivas id    DEFAULT     �   ALTER TABLE ONLY public.cierre_actividadesproductivas ALTER COLUMN id SET DEFAULT nextval('public.cierre_actividadesproductivas_id_seq'::regclass);
 O   ALTER TABLE public.cierre_actividadesproductivas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    24769    cierre_proyectista id    DEFAULT     ~   ALTER TABLE ONLY public.cierre_proyectista ALTER COLUMN id SET DEFAULT nextval('public.cierre_proyectista_id_seq'::regclass);
 D   ALTER TABLE public.cierre_proyectista ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    24770    cierre_proyecto id    DEFAULT     x   ALTER TABLE ONLY public.cierre_proyecto ALTER COLUMN id SET DEFAULT nextval('public.cierre_proyecto_id_seq'::regclass);
 A   ALTER TABLE public.cierre_proyecto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    24771 
   cliente id    DEFAULT     h   ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);
 9   ALTER TABLE public.cliente ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226            �           2604    24772    contratos id    DEFAULT     l   ALTER TABLE ONLY public.contratos ALTER COLUMN id SET DEFAULT nextval('public.contratos_id_seq'::regclass);
 ;   ALTER TABLE public.contratos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228            �           2604    24773    control_actividades id    DEFAULT     �   ALTER TABLE ONLY public.control_actividades ALTER COLUMN id SET DEFAULT nextval('public.control_actividades_id_seq'::regclass);
 E   ALTER TABLE public.control_actividades ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230            �           2604    24774    control_obra id    DEFAULT     r   ALTER TABLE ONLY public.control_obra ALTER COLUMN id SET DEFAULT nextval('public.control_obra_id_seq'::regclass);
 >   ALTER TABLE public.control_obra ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232            �           2604    24775    denominaciones id    DEFAULT     v   ALTER TABLE ONLY public.denominaciones ALTER COLUMN id SET DEFAULT nextval('public.denominaciones_id_seq'::regclass);
 @   ALTER TABLE public.denominaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234            �           2604    24776 
   empresa id    DEFAULT     h   ALTER TABLE ONLY public.empresa ALTER COLUMN id SET DEFAULT nextval('public.empresa_id_seq'::regclass);
 9   ALTER TABLE public.empresa ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236            �           2604    24777 	   equipo id    DEFAULT     f   ALTER TABLE ONLY public.equipo ALTER COLUMN id SET DEFAULT nextval('public.equipo_id_seq'::regclass);
 8   ALTER TABLE public.equipo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    238            �           2604    24778 
   escalas id    DEFAULT     h   ALTER TABLE ONLY public.escalas ALTER COLUMN id SET DEFAULT nextval('public.escalas_id_seq'::regclass);
 9   ALTER TABLE public.escalas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    240            �           2604    24779    especialidad id    DEFAULT     r   ALTER TABLE ONLY public.especialidad ALTER COLUMN id SET DEFAULT nextval('public.especialidad_id_seq'::regclass);
 >   ALTER TABLE public.especialidad ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    243    242            �           2604    24780 
   estados id    DEFAULT     h   ALTER TABLE ONLY public.estados ALTER COLUMN id SET DEFAULT nextval('public.estados_id_seq'::regclass);
 9   ALTER TABLE public.estados ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    245    244            �           2604    24781    factura_subp id    DEFAULT     r   ALTER TABLE ONLY public.factura_subp ALTER COLUMN id SET DEFAULT nextval('public.factura_subp_id_seq'::regclass);
 >   ALTER TABLE public.factura_subp ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247            �           2604    24782    feriados id    DEFAULT     j   ALTER TABLE ONLY public.feriados ALTER COLUMN id SET DEFAULT nextval('public.feriados_id_seq'::regclass);
 :   ALTER TABLE public.feriados ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249            �           2604    24783    integrantes id    DEFAULT     p   ALTER TABLE ONLY public.integrantes ALTER COLUMN id SET DEFAULT nextval('public.integrantes_id_seq'::regclass);
 =   ALTER TABLE public.integrantes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    251            �           2604    24784    produccion_anual id    DEFAULT     z   ALTER TABLE ONLY public.produccion_anual ALTER COLUMN id SET DEFAULT nextval('public.produccion_anual_id_seq'::regclass);
 B   ALTER TABLE public.produccion_anual ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    253            �           2604    24785    produccion_mes id    DEFAULT     v   ALTER TABLE ONLY public.produccion_mes ALTER COLUMN id SET DEFAULT nextval('public.produccion_mes_id_seq'::regclass);
 @   ALTER TABLE public.produccion_mes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    255            �           2604    24786    proyectos id    DEFAULT     l   ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);
 ;   ALTER TABLE public.proyectos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    258    257            �           2604    24787    rol id    DEFAULT     `   ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);
 5   ALTER TABLE public.rol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259            �           2604    24788 
   salario id    DEFAULT     h   ALTER TABLE ONLY public.salario ALTER COLUMN id SET DEFAULT nextval('public.salario_id_seq'::regclass);
 9   ALTER TABLE public.salario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    262    261            �           2604    24789    sub_proyecto id    DEFAULT     r   ALTER TABLE ONLY public.sub_proyecto ALTER COLUMN id SET DEFAULT nextval('public.sub_proyecto_id_seq'::regclass);
 >   ALTER TABLE public.sub_proyecto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    264    263            �           2604    24790    temporal id    DEFAULT     j   ALTER TABLE ONLY public.temporal ALTER COLUMN id SET DEFAULT nextval('public.temporal_id_seq'::regclass);
 :   ALTER TABLE public.temporal ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    265            �           2604    24791    trabajador id    DEFAULT     n   ALTER TABLE ONLY public.trabajador ALTER COLUMN id SET DEFAULT nextval('public.trabajador_id_seq'::regclass);
 <   ALTER TABLE public.trabajador ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    268    267            �           2604    24792 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269            �          0    24589    actividades 
   TABLE DATA           U   COPY public.actividades (id, actividad, tiempo_d, pro_ratea, productiva) FROM stdin;
    public          postgres    false    203   �m      �          0    24594    area 
   TABLE DATA           ?   COPY public.area (id, codigo, nombre, "EmpresaId") FROM stdin;
    public          postgres    false    205   �n      �          0    24599 
   asignacion 
   TABLE DATA           E   COPY public.asignacion (id, "EquipoId", "SubProyectoId") FROM stdin;
    public          postgres    false    207   �o      �          0    24604 	   auditoria 
   TABLE DATA           Z   COPY public.auditoria (id, ip, action, metodo, qry, url, nombre, "UsuarioId") FROM stdin;
    public          postgres    false    209   �o      �          0    24609    cantp 
   TABLE DATA           &   COPY public.cantp (count) FROM stdin;
    public          postgres    false    211   �o      �          0    24612    cargo 
   TABLE DATA           *   COPY public.cargo (id, cargo) FROM stdin;
    public          postgres    false    212   p      �          0    24617    cierre 
   TABLE DATA           �   COPY public.cierre (id, codigo, nombre, anno, produccion_bruta, produccion_acumulada, produccion_mercantil, produccion_cuc, mes) FROM stdin;
    public          postgres    false    214   r      �          0    24620    cierre_actividades 
   TABLE DATA           r   COPY public.cierre_actividades (id, anno, mes, acumulado_actividades, "ActividadeId", "TrabajadorId") FROM stdin;
    public          postgres    false    215   +r      �          0    24625    cierre_actividadesnoproductivas 
   TABLE DATA           o   COPY public.cierre_actividadesnoproductivas (id, anno, mes, acumulado_actividades, "TrabajadorId") FROM stdin;
    public          postgres    false    217   Hr      �          0    24630    cierre_actividadesproductivas 
   TABLE DATA           m   COPY public.cierre_actividadesproductivas (id, anno, mes, acumulado_actividades, "TrabajadorId") FROM stdin;
    public          postgres    false    219   �r      �          0    24637    cierre_proyectista 
   TABLE DATA           m   COPY public.cierre_proyectista (id, anno, mes, acumulado_obras, "SubProyectoId", "TrabajadorId") FROM stdin;
    public          postgres    false    222   �r      �          0    24642    cierre_proyecto 
   TABLE DATA           �   COPY public.cierre_proyecto (id, mes, anno, horas_acumuladas, produccion_bruta, produccion_mercantil, produccion_cuc, "ProyectoId") FROM stdin;
    public          postgres    false    224   �r      �          0    24647    cliente 
   TABLE DATA           7   COPY public.cliente (id, nombre, programa) FROM stdin;
    public          postgres    false    226   %s      �          0    24652 	   contratos 
   TABLE DATA           w   COPY public.contratos (id, nombre, numero, fecha_inicio, fecha_cierre, codigo_tratos, activo, "ClienteId") FROM stdin;
    public          postgres    false    228   �t      �          0    24657    control_actividades 
   TABLE DATA           i   COPY public.control_actividades (id, dia, mes, anno, tiempo, "TrabajadorId", "ActividadeId") FROM stdin;
    public          postgres    false    230   ^}      �          0    24662    control_obra 
   TABLE DATA           c   COPY public.control_obra (id, dia, mes, anno, tiempo, "TrabajadorId", "SubProyectoId") FROM stdin;
    public          postgres    false    232   �}      �          0    24667    denominaciones 
   TABLE DATA           G   COPY public.denominaciones (id, denominacion, descripcion) FROM stdin;
    public          postgres    false    234   �}      �          0    24672    empresa 
   TABLE DATA           Z   COPY public.empresa (id, nombre, direccion, objeto, mision, vision, telefono) FROM stdin;
    public          postgres    false    236   S~      �          0    24677    equipo 
   TABLE DATA           4   COPY public.equipo (id, nombre, codigo) FROM stdin;
    public          postgres    false    238   �~      �          0    24682    escalas 
   TABLE DATA           ?   COPY public.escalas (id, escala, fecha, "CargoId") FROM stdin;
    public          postgres    false    240         �          0    24687    especialidad 
   TABLE DATA           @   COPY public.especialidad (id, especialidad, codigo) FROM stdin;
    public          postgres    false    242   +      �          0    24692    estados 
   TABLE DATA           :   COPY public.estados (id, estado, descripcion) FROM stdin;
    public          postgres    false    244   q�      �          0    24697    f 
   TABLE DATA           "   COPY public.f (count) FROM stdin;
    public          postgres    false    246   �      �          0    24700    factura_subp 
   TABLE DATA           M   COPY public.factura_subp (id, valor, valor_cuc, "SubProyectoId") FROM stdin;
    public          postgres    false    247   �      �          0    24705    feriados 
   TABLE DATA           5   COPY public.feriados (id, fecha, motivo) FROM stdin;
    public          postgres    false    249   $�      �          0    24710    integrantes 
   TABLE DATA           R   COPY public.integrantes (id, funcion, "AsignacionId", "TrabajadorId") FROM stdin;
    public          postgres    false    251   A�      �          0    24715    produccion_anual 
   TABLE DATA           V   COPY public.produccion_anual (id, anno, plan, salario_medio, "EmpresaId") FROM stdin;
    public          postgres    false    253   *�      �          0    24720    produccion_mes 
   TABLE DATA           r   COPY public.produccion_mes (id, mes, anno, plan, plan_real, salario_mensual, horas_mensual, "AreaId") FROM stdin;
    public          postgres    false    255   G�      �          0    24725 	   proyectos 
   TABLE DATA           v   COPY public.proyectos (id, codigo, nombre, valor_total, descripcion, terminado, "ContratoId", "EstadoId") FROM stdin;
    public          postgres    false    257   d�      �          0    24730    rol 
   TABLE DATA           ,   COPY public.rol (id, rol, name) FROM stdin;
    public          postgres    false    259   ��      �          0    24735    salario 
   TABLE DATA           o   COPY public.salario (id, mes, anno, salario, salario_descuento, salario_resultado, "TrabajadorId") FROM stdin;
    public          postgres    false    261   +�      �          0    24740    sub_proyecto 
   TABLE DATA           m   COPY public.sub_proyecto (id, codigo, sub_valor, descripcion, terminado, "ProyectoId", "AreaId") FROM stdin;
    public          postgres    false    263   H�      �          0    24745    temporal 
   TABLE DATA           5   COPY public.temporal (id, codigo, valor) FROM stdin;
    public          postgres    false    265   s�      �          0    24750 
   trabajador 
   TABLE DATA           �   COPY public.trabajador (id, nombre, apellidos, perfec_empresarial, coeficiente, salario_basico, salario_hora, "EspecialidadId", "CargoId", "AreaId", "DenominacioneId", "UsuarioId") FROM stdin;
    public          postgres    false    267   �      �          0    24755    usuario 
   TABLE DATA           `   COPY public.usuario (id, username, descripcion, password, email, "RolId", "AreaId") FROM stdin;
    public          postgres    false    269   ��      �           0    0    actividades_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.actividades_id_seq', 15, true);
          public          postgres    false    204            �           0    0    area_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.area_id_seq', 20, true);
          public          postgres    false    206            �           0    0    asignacion_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.asignacion_id_seq', 36, true);
          public          postgres    false    208            �           0    0    auditoria_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.auditoria_id_seq', 1, false);
          public          postgres    false    210            �           0    0    cargo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cargo_id_seq', 37, true);
          public          postgres    false    213            �           0    0    cierre_actividades_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cierre_actividades_id_seq', 31, true);
          public          postgres    false    216            �           0    0 &   cierre_actividadesnoproductivas_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.cierre_actividadesnoproductivas_id_seq', 39, true);
          public          postgres    false    218            �           0    0 $   cierre_actividadesproductivas_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.cierre_actividadesproductivas_id_seq', 4, true);
          public          postgres    false    220            �           0    0    cierre_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.cierre_id_seq', 49, true);
          public          postgres    false    221                        0    0    cierre_proyectista_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.cierre_proyectista_id_seq', 389, true);
          public          postgres    false    223                       0    0    cierre_proyecto_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cierre_proyecto_id_seq', 24, true);
          public          postgres    false    225                       0    0    cliente_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cliente_id_seq', 30, true);
          public          postgres    false    227                       0    0    contratos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.contratos_id_seq', 59, true);
          public          postgres    false    229                       0    0    control_actividades_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.control_actividades_id_seq', 119, true);
          public          postgres    false    231                       0    0    control_obra_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.control_obra_id_seq', 153, true);
          public          postgres    false    233                       0    0    denominaciones_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.denominaciones_id_seq', 4, true);
          public          postgres    false    235                       0    0    empresa_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.empresa_id_seq', 1, true);
          public          postgres    false    237                       0    0    equipo_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.equipo_id_seq', 10, true);
          public          postgres    false    239            	           0    0    escalas_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.escalas_id_seq', 3, true);
          public          postgres    false    241            
           0    0    especialidad_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.especialidad_id_seq', 23, true);
          public          postgres    false    243                       0    0    estados_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.estados_id_seq', 6, true);
          public          postgres    false    245                       0    0    factura_subp_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.factura_subp_id_seq', 1, false);
          public          postgres    false    248                       0    0    feriados_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feriados_id_seq', 1, false);
          public          postgres    false    250                       0    0    integrantes_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.integrantes_id_seq', 47, true);
          public          postgres    false    252                       0    0    produccion_anual_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.produccion_anual_id_seq', 4, true);
          public          postgres    false    254                       0    0    produccion_mes_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.produccion_mes_id_seq', 1, true);
          public          postgres    false    256                       0    0    proyectos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.proyectos_id_seq', 34, true);
          public          postgres    false    258                       0    0 
   rol_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.rol_id_seq', 5, true);
          public          postgres    false    260                       0    0    salario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.salario_id_seq', 1, false);
          public          postgres    false    262                       0    0    sub_proyecto_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sub_proyecto_id_seq', 36, true);
          public          postgres    false    264                       0    0    temporal_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.temporal_id_seq', 68, true);
          public          postgres    false    266                       0    0    trabajador_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.trabajador_id_seq', 34, true);
          public          postgres    false    268                       0    0    usuario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuario_id_seq', 36, true);
          public          postgres    false    270            �           2606    24794    actividades actividades_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT actividades_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.actividades DROP CONSTRAINT actividades_pkey;
       public            postgres    false    203            �           2606    24796    area area_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.area DROP CONSTRAINT area_pkey;
       public            postgres    false    205            �           2606    24798 0   asignacion asignacion_EquipoId_SubProyectoId_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.asignacion
    ADD CONSTRAINT "asignacion_EquipoId_SubProyectoId_key" UNIQUE ("EquipoId", "SubProyectoId");
 \   ALTER TABLE ONLY public.asignacion DROP CONSTRAINT "asignacion_EquipoId_SubProyectoId_key";
       public            postgres    false    207    207            �           2606    24800    asignacion asignacion_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.asignacion
    ADD CONSTRAINT asignacion_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.asignacion DROP CONSTRAINT asignacion_pkey;
       public            postgres    false    207            �           2606    24802    auditoria auditoria_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auditoria
    ADD CONSTRAINT auditoria_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auditoria DROP CONSTRAINT auditoria_pkey;
       public            postgres    false    209            �           2606    24804    cargo cargo_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cargo
    ADD CONSTRAINT cargo_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cargo DROP CONSTRAINT cargo_pkey;
       public            postgres    false    212            �           2606    24806 *   cierre_actividades cierre_actividades_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.cierre_actividades
    ADD CONSTRAINT cierre_actividades_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.cierre_actividades DROP CONSTRAINT cierre_actividades_pkey;
       public            postgres    false    215            �           2606    24808 D   cierre_actividadesnoproductivas cierre_actividadesnoproductivas_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cierre_actividadesnoproductivas
    ADD CONSTRAINT cierre_actividadesnoproductivas_pkey PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.cierre_actividadesnoproductivas DROP CONSTRAINT cierre_actividadesnoproductivas_pkey;
       public            postgres    false    217            �           2606    24810 @   cierre_actividadesproductivas cierre_actividadesproductivas_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.cierre_actividadesproductivas
    ADD CONSTRAINT cierre_actividadesproductivas_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.cierre_actividadesproductivas DROP CONSTRAINT cierre_actividadesproductivas_pkey;
       public            postgres    false    219            �           2606    24812    cierre cierre_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cierre
    ADD CONSTRAINT cierre_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cierre DROP CONSTRAINT cierre_pkey;
       public            postgres    false    214            �           2606    24814 *   cierre_proyectista cierre_proyectista_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.cierre_proyectista
    ADD CONSTRAINT cierre_proyectista_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.cierre_proyectista DROP CONSTRAINT cierre_proyectista_pkey;
       public            postgres    false    222            �           2606    24816 $   cierre_proyecto cierre_proyecto_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.cierre_proyecto
    ADD CONSTRAINT cierre_proyecto_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.cierre_proyecto DROP CONSTRAINT cierre_proyecto_pkey;
       public            postgres    false    224            �           2606    24818    cliente cliente_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    226            �           2606    24820    contratos contratos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT contratos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.contratos DROP CONSTRAINT contratos_pkey;
       public            postgres    false    228            �           2606    24822 ,   control_actividades control_actividades_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.control_actividades
    ADD CONSTRAINT control_actividades_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.control_actividades DROP CONSTRAINT control_actividades_pkey;
       public            postgres    false    230            �           2606    24824    control_obra control_obra_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.control_obra
    ADD CONSTRAINT control_obra_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.control_obra DROP CONSTRAINT control_obra_pkey;
       public            postgres    false    232            �           2606    24826 "   denominaciones denominaciones_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.denominaciones
    ADD CONSTRAINT denominaciones_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.denominaciones DROP CONSTRAINT denominaciones_pkey;
       public            postgres    false    234            �           2606    24828    empresa empresa_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.empresa DROP CONSTRAINT empresa_pkey;
       public            postgres    false    236            �           2606    24830    equipo equipo_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.equipo
    ADD CONSTRAINT equipo_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.equipo DROP CONSTRAINT equipo_pkey;
       public            postgres    false    238            �           2606    24832    escalas escalas_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.escalas
    ADD CONSTRAINT escalas_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.escalas DROP CONSTRAINT escalas_pkey;
       public            postgres    false    240            �           2606    24834    especialidad especialidad_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT especialidad_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.especialidad DROP CONSTRAINT especialidad_pkey;
       public            postgres    false    242            �           2606    24836    estados estados_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.estados DROP CONSTRAINT estados_pkey;
       public            postgres    false    244            �           2606    24838    factura_subp factura_subp_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.factura_subp
    ADD CONSTRAINT factura_subp_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.factura_subp DROP CONSTRAINT factura_subp_pkey;
       public            postgres    false    247            �           2606    24840    feriados feriados_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.feriados
    ADD CONSTRAINT feriados_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.feriados DROP CONSTRAINT feriados_pkey;
       public            postgres    false    249            �           2606    24842    integrantes integrantes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.integrantes
    ADD CONSTRAINT integrantes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.integrantes DROP CONSTRAINT integrantes_pkey;
       public            postgres    false    251            �           2606    24844 &   produccion_anual produccion_anual_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.produccion_anual
    ADD CONSTRAINT produccion_anual_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.produccion_anual DROP CONSTRAINT produccion_anual_pkey;
       public            postgres    false    253            �           2606    24846 "   produccion_mes produccion_mes_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.produccion_mes
    ADD CONSTRAINT produccion_mes_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.produccion_mes DROP CONSTRAINT produccion_mes_pkey;
       public            postgres    false    255            �           2606    24848    proyectos proyectos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_pkey;
       public            postgres    false    257            �           2606    24850    rol rol_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            postgres    false    259            �           2606    24852    salario salario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.salario
    ADD CONSTRAINT salario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.salario DROP CONSTRAINT salario_pkey;
       public            postgres    false    261            �           2606    24854    sub_proyecto sub_proyecto_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.sub_proyecto
    ADD CONSTRAINT sub_proyecto_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.sub_proyecto DROP CONSTRAINT sub_proyecto_pkey;
       public            postgres    false    263            �           2606    24856    temporal temporal_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.temporal
    ADD CONSTRAINT temporal_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.temporal DROP CONSTRAINT temporal_pkey;
       public            postgres    false    265            �           2606    24858    trabajador trabajador_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.trabajador
    ADD CONSTRAINT trabajador_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.trabajador DROP CONSTRAINT trabajador_pkey;
       public            postgres    false    267            �           2606    24860    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    269            
           2620    25007    cierre tg_calculoprod_acumulada    TRIGGER     �   CREATE TRIGGER tg_calculoprod_acumulada AFTER UPDATE OF produccion_mercantil ON public.cierre FOR EACH ROW EXECUTE FUNCTION public.ftg_calculoprod_acumulada();
 8   DROP TRIGGER tg_calculoprod_acumulada ON public.cierre;
       public          postgres    false    214    214    273                       2620    24861 $   cierre_proyectista tg_cierreProyecto    TRIGGER     �   CREATE TRIGGER "tg_cierreProyecto" AFTER INSERT OR UPDATE OF acumulado_obras ON public.cierre_proyectista FOR EACH ROW EXECUTE FUNCTION public.ftg_cierreproyecto();
 ?   DROP TRIGGER "tg_cierreProyecto" ON public.cierre_proyectista;
       public          postgres    false    222    289    222                       2620    24862 (   control_actividades tg_cierreactividades    TRIGGER     �   CREATE TRIGGER tg_cierreactividades AFTER INSERT OR UPDATE OF tiempo ON public.control_actividades FOR EACH ROW EXECUTE FUNCTION public.ftg_cierreactividades();
 A   DROP TRIGGER tg_cierreactividades ON public.control_actividades;
       public          postgres    false    230    287    230                       2620    24863 !   control_obra tg_cierreproyectista    TRIGGER     �   CREATE TRIGGER tg_cierreproyectista AFTER INSERT OR UPDATE OF tiempo ON public.control_obra FOR EACH ROW EXECUTE FUNCTION public.ftg_cierreproyectista();
 :   DROP TRIGGER tg_cierreproyectista ON public.control_obra;
       public          postgres    false    232    288    232            �           2606    24865    area area_EmpresaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.area
    ADD CONSTRAINT "area_EmpresaId_fkey" FOREIGN KEY ("EmpresaId") REFERENCES public.empresa(id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.area DROP CONSTRAINT "area_EmpresaId_fkey";
       public          postgres    false    236    205    3023            �           2606    24880 7   cierre_actividades cierre_actividades_ActividadeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cierre_actividades
    ADD CONSTRAINT "cierre_actividades_ActividadeId_fkey" FOREIGN KEY ("ActividadeId") REFERENCES public.actividades(id) ON UPDATE CASCADE ON DELETE SET NULL;
 c   ALTER TABLE ONLY public.cierre_actividades DROP CONSTRAINT "cierre_actividades_ActividadeId_fkey";
       public          postgres    false    2989    215    203            �           2606    24885 7   cierre_actividades cierre_actividades_TrabajadorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cierre_actividades
    ADD CONSTRAINT "cierre_actividades_TrabajadorId_fkey" FOREIGN KEY ("TrabajadorId") REFERENCES public.trabajador(id) ON UPDATE CASCADE ON DELETE SET NULL;
 c   ALTER TABLE ONLY public.cierre_actividades DROP CONSTRAINT "cierre_actividades_TrabajadorId_fkey";
       public          postgres    false    215    3053    267            �           2606    24890 Q   cierre_actividadesnoproductivas cierre_actividadesnoproductivas_TrabajadorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cierre_actividadesnoproductivas
    ADD CONSTRAINT "cierre_actividadesnoproductivas_TrabajadorId_fkey" FOREIGN KEY ("TrabajadorId") REFERENCES public.trabajador(id) ON UPDATE CASCADE NOT VALID;
 }   ALTER TABLE ONLY public.cierre_actividadesnoproductivas DROP CONSTRAINT "cierre_actividadesnoproductivas_TrabajadorId_fkey";
       public          postgres    false    3053    267    217            �           2606    24895 M   cierre_actividadesproductivas cierre_actividadesproductivas_TrabajadorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cierre_actividadesproductivas
    ADD CONSTRAINT "cierre_actividadesproductivas_TrabajadorId_fkey" FOREIGN KEY ("TrabajadorId") REFERENCES public.trabajador(id) ON UPDATE CASCADE;
 y   ALTER TABLE ONLY public.cierre_actividadesproductivas DROP CONSTRAINT "cierre_actividadesproductivas_TrabajadorId_fkey";
       public          postgres    false    3053    219    267            �           2606    24900 7   cierre_proyectista cierre_proyectista_TrabajadorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cierre_proyectista
    ADD CONSTRAINT "cierre_proyectista_TrabajadorId_fkey" FOREIGN KEY ("TrabajadorId") REFERENCES public.trabajador(id) ON UPDATE CASCADE ON DELETE SET NULL;
 c   ALTER TABLE ONLY public.cierre_proyectista DROP CONSTRAINT "cierre_proyectista_TrabajadorId_fkey";
       public          postgres    false    267    3053    222            �           2606    24905 /   cierre_proyecto cierre_proyecto_ProyectoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cierre_proyecto
    ADD CONSTRAINT "cierre_proyecto_ProyectoId_fkey" FOREIGN KEY ("ProyectoId") REFERENCES public.proyectos(id) ON UPDATE CASCADE ON DELETE SET NULL;
 [   ALTER TABLE ONLY public.cierre_proyecto DROP CONSTRAINT "cierre_proyecto_ProyectoId_fkey";
       public          postgres    false    224    257    3043            �           2606    24910 "   contratos contratos_ClienteId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT "contratos_ClienteId_fkey" FOREIGN KEY ("ClienteId") REFERENCES public.cliente(id) ON UPDATE CASCADE ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.contratos DROP CONSTRAINT "contratos_ClienteId_fkey";
       public          postgres    false    3013    226    228            �           2606    24915 9   control_actividades control_actividades_ActividadeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.control_actividades
    ADD CONSTRAINT "control_actividades_ActividadeId_fkey" FOREIGN KEY ("ActividadeId") REFERENCES public.actividades(id) ON UPDATE CASCADE ON DELETE SET NULL;
 e   ALTER TABLE ONLY public.control_actividades DROP CONSTRAINT "control_actividades_ActividadeId_fkey";
       public          postgres    false    2989    230    203            �           2606    24920 9   control_actividades control_actividades_TrabajadorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.control_actividades
    ADD CONSTRAINT "control_actividades_TrabajadorId_fkey" FOREIGN KEY ("TrabajadorId") REFERENCES public.trabajador(id) ON UPDATE CASCADE ON DELETE SET NULL;
 e   ALTER TABLE ONLY public.control_actividades DROP CONSTRAINT "control_actividades_TrabajadorId_fkey";
       public          postgres    false    3053    267    230            �           2606    24925 +   control_obra control_obra_TrabajadorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.control_obra
    ADD CONSTRAINT "control_obra_TrabajadorId_fkey" FOREIGN KEY ("TrabajadorId") REFERENCES public.trabajador(id) ON UPDATE CASCADE ON DELETE SET NULL;
 W   ALTER TABLE ONLY public.control_obra DROP CONSTRAINT "control_obra_TrabajadorId_fkey";
       public          postgres    false    232    267    3053            �           2606    24930    escalas escalas_CargoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.escalas
    ADD CONSTRAINT "escalas_CargoId_fkey" FOREIGN KEY ("CargoId") REFERENCES public.cargo(id) ON UPDATE CASCADE ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.escalas DROP CONSTRAINT "escalas_CargoId_fkey";
       public          postgres    false    2999    212    240            �           2606    24935 )   integrantes integrantes_TrabajadorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.integrantes
    ADD CONSTRAINT "integrantes_TrabajadorId_fkey" FOREIGN KEY ("TrabajadorId") REFERENCES public.trabajador(id) ON UPDATE CASCADE ON DELETE SET NULL;
 U   ALTER TABLE ONLY public.integrantes DROP CONSTRAINT "integrantes_TrabajadorId_fkey";
       public          postgres    false    267    251    3053            �           2606    24940 0   produccion_anual produccion_anual_EmpresaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produccion_anual
    ADD CONSTRAINT "produccion_anual_EmpresaId_fkey" FOREIGN KEY ("EmpresaId") REFERENCES public.empresa(id) ON UPDATE CASCADE ON DELETE SET NULL;
 \   ALTER TABLE ONLY public.produccion_anual DROP CONSTRAINT "produccion_anual_EmpresaId_fkey";
       public          postgres    false    253    3023    236            �           2606    24946 )   produccion_mes produccion_mes_AreaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produccion_mes
    ADD CONSTRAINT "produccion_mes_AreaId_fkey" FOREIGN KEY ("AreaId") REFERENCES public.area(id) ON UPDATE CASCADE ON DELETE SET NULL;
 U   ALTER TABLE ONLY public.produccion_mes DROP CONSTRAINT "produccion_mes_AreaId_fkey";
       public          postgres    false    2991    205    255            �           2606    24951 #   proyectos proyectos_ContratoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT "proyectos_ContratoId_fkey" FOREIGN KEY ("ContratoId") REFERENCES public.contratos(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT "proyectos_ContratoId_fkey";
       public          postgres    false    3015    257    228                        2606    24956 !   proyectos proyectos_EstadoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT "proyectos_EstadoId_fkey" FOREIGN KEY ("EstadoId") REFERENCES public.estados(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT "proyectos_EstadoId_fkey";
       public          postgres    false    244    3031    257                       2606    24961 %   sub_proyecto sub_proyecto_AreaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sub_proyecto
    ADD CONSTRAINT "sub_proyecto_AreaId_fkey" FOREIGN KEY ("AreaId") REFERENCES public.area(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.sub_proyecto DROP CONSTRAINT "sub_proyecto_AreaId_fkey";
       public          postgres    false    263    205    2991                       2606    24966 )   sub_proyecto sub_proyecto_ProyectoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sub_proyecto
    ADD CONSTRAINT "sub_proyecto_ProyectoId_fkey" FOREIGN KEY ("ProyectoId") REFERENCES public.proyectos(id) ON UPDATE CASCADE ON DELETE SET NULL;
 U   ALTER TABLE ONLY public.sub_proyecto DROP CONSTRAINT "sub_proyecto_ProyectoId_fkey";
       public          postgres    false    3043    257    263                       2606    24971 !   trabajador trabajador_AreaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trabajador
    ADD CONSTRAINT "trabajador_AreaId_fkey" FOREIGN KEY ("AreaId") REFERENCES public.area(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.trabajador DROP CONSTRAINT "trabajador_AreaId_fkey";
       public          postgres    false    2991    267    205                       2606    24976 "   trabajador trabajador_CargoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trabajador
    ADD CONSTRAINT "trabajador_CargoId_fkey" FOREIGN KEY ("CargoId") REFERENCES public.cargo(id) ON UPDATE CASCADE ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.trabajador DROP CONSTRAINT "trabajador_CargoId_fkey";
       public          postgres    false    2999    212    267                       2606    24981 *   trabajador trabajador_DenominacioneId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trabajador
    ADD CONSTRAINT "trabajador_DenominacioneId_fkey" FOREIGN KEY ("DenominacioneId") REFERENCES public.denominaciones(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.trabajador DROP CONSTRAINT "trabajador_DenominacioneId_fkey";
       public          postgres    false    267    234    3021                       2606    24986 )   trabajador trabajador_EspecialidadId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trabajador
    ADD CONSTRAINT "trabajador_EspecialidadId_fkey" FOREIGN KEY ("EspecialidadId") REFERENCES public.especialidad(id) ON UPDATE CASCADE ON DELETE SET NULL;
 U   ALTER TABLE ONLY public.trabajador DROP CONSTRAINT "trabajador_EspecialidadId_fkey";
       public          postgres    false    3029    242    267                       2606    24991 $   trabajador trabajador_UsuarioId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trabajador
    ADD CONSTRAINT "trabajador_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE SET NULL;
 P   ALTER TABLE ONLY public.trabajador DROP CONSTRAINT "trabajador_UsuarioId_fkey";
       public          postgres    false    3055    267    269                       2606    24996    usuario usuario_AreaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_AreaId_fkey" FOREIGN KEY ("AreaId") REFERENCES public.area(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_AreaId_fkey";
       public          postgres    false    2991    269    205            	           2606    25001    usuario usuario_RolId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RolId_fkey" FOREIGN KEY ("RolId") REFERENCES public.rol(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RolId_fkey";
       public          postgres    false    259    269    3045            �   �   x�]��n1E��W�bx�.Am%<Բd�&E�qhL�[���c-jG#yu|�� d�� �������%р'��e��+.9j*�rсqR멅���Xq�sr�����Le�����.,c�,�"EKI�}x��Ʌ��s�����KO����p��W�.�x���9��P����vjу���_)�@�8�M�UCZ��1�hwbw      �   �   x�E�Mn1��oN� g�_"�Բ!�ݘ�g��Q�9��G��� Dw�������7�"��a+K �����B�,�ƇӠ��Mq7Ĥ�|=MLA���v�@.���
�/y,`Zb��"�^uZ��׫Ĳ.�m_�y���C�l�Ҋi��6��5r��O2�OMȩ[��ђ�=���0�G�      �   C   x���� ��b2X
zI�ud�ku�bG��D&j)t�(<�gsc5'v%�^�xޫqݤ�����      �      x������ � �      �      x�3����� h �      �   �  x��T�r�0�ɯ���E�c�#D�|���\��ִc�~~A��ɩϾn"� <<<�x4{��rع=�D���߹�`$rt/CG[w�0p7~���Iz����]�v����[NB�x20�QC ��C�&�(������ks���=_�:�4�Pr���УK&�1$�9$S�Pvϗap��"�|�h�*�~�@��/�	���dav,��E�!D[z��Q�� T+#[��O3Ruz[>����8�i!�Vo�rc"�
��	P����Y�$���%�y/����^x�b˭	h�.�>;"X?���e����kճ�.$iF��*��ڗ�����Ia�J�X3� sJ��<��Ԥ��zRC;z�fV�z?������A���ۼ~5��^X���Q���ǡ�,������<��8o�m���ҖPA��Y�e�R�{c˵�Ir:��v���9�a���P���)��S�/W	}��k��xG�      �      x������ � �      �      x������ � �      �   (   x�3��4202�4�44�3�46�2���q�p��qqq rP�      �      x�3�4202�4�4�46������ ��      �   .   x�3���4202�4�4�44 ���-,aB�fz������\1z\\\ ���      �   ,   x�32�4�4202�4�30�4@%̹�L`�fz�
,�b���� 
�      �   �  x�}��N�@���)���|�4�UQ[*J�X�ĭN����@�o����X�b�)���r��g����?MF�ʒC��ZV��[����_�l<���-W�%�$���m��d�N#��ޅ2>��O[~����yU�VT��$��ƚ��+�1�N�	�h��F�ϛ�[��`�RWh���y,T�i���U����;�埙��c���t�ѫ�4m��K�*���vT_'Y���dK�	��h۷��4yZf��-�P�)bj�?�r�zÐ��Qk�"Mb��2�P1̕Vh"1h��\,�<�m��)p�:����(�$�Ϗ
p�f�gE{Xʔ;.��P�g([���&ЖD��Pd���Q��;����䰖�$��,��u�ޙx���=�AsԐ��$��B�Q��I���V��      �   �  x��X�n����`9ā�e���8�v,�-3^d�CI�jdo�r�[,����d��CJ�۹;�;M"�2��w��P�GfR<�t�鍐</X��gtΟZ������YN�=���SFG����H�1�bi*rFo�"9|���@\۵{v�s��߳C\(��X�O����9]J�Kb�������4�:KY�<�S��d{.�Dd�sH`�1�D@�좼��F<�<P���vq3z�
� �Vf�Nr�WG����(ח$p*{a�v�i
�x��I�#�Zry�7�zx�\m8�+F��A��_�$SOg���KX�
�RR����:B�%�
H\�8҆g	���$�%:@���枸f�z���A*q��
��d[��5�CJ�Ż[��5��3!/(@�\'@,.�U�&k���Xd��[�9D;�{�l�@@�d���f�}� ѷ\�,��=TId���-�4���C��VDFb�K���.�B��&����  V>��Ã,4���UV��v������΄����,��Ɲ�E)I�8נ��<W���H9����tK�ӤN���uH'AIIt�%G9Ҏ8�iO@�y�7�&�ÍL�2-J�H���}��78D` �PU���U\b%�x��%��M�9}2���ڻ�Ü�B����-�4OQW!��*��b����Pp7���m�>�(ɉ,'<�H�iFjX�.��	W�ϭdFr�(��w�[G���;hJHAՖа�3%��^�z�V@�hM�/�~�x�U7��
�8�O��qA��Oh��@�"{9�����[v{n���r?[�.��s������W������tx?����� m�hcc�2�q�Xw#� E�9�x߼M��t�	KPw�o��.a�	��d6���x��L��t9.�w�񽾝����t��Cz?|���t�0���{���pC\P�zd%K����R�kI��H�o2Aa��0�nz�VH�r�R�20�7Dd���A�s]���<�A�\۝'\���d�zx#�����=H�Sq� J���W�=�ǐ�H�������gA�j�C"Tb�SH�q�Mr���^JQ�w,��v��՘�S�N�{��:�
ѻ�)�o���]���hjs}�Z� o�\�KW+���P� 8=|����'��c��:�$�\C9�,A�0i-����u#-�t_KW�;I��^ Ѝ୧� �-q�S�a�p]�bmi���ъ��y=7u�1p�̎�Ǫt��O<?�'��߲5r�t`��U<Y��ى�=�DI���#����"��Uml[�;�Iw\�Hq|z��eܿo���ԥ�P|���;��L�ľC�.�1�"4�:�=���jA�����6݁�K�=��NB��"0��C�]%��q��p�9 �N�۞>�x'�VX<յ��v�]t��Y�^@�0%pM~3 3u��^�e{�{K'���3ɱ[��ア/�;��N�bpA��"u{d1��@�?5`)�x���O�"���~lޫ�L��s���b�a<~<Sk�̭�:��fv\˷�L}��ԇ��*�q�%O�7n�,�6���M7�R�t����N�E{�~G��3n��gʎ��uzg���c�����:*�n�/�XS�S�@^f�m�т`�x�*��������qJ�Y�b������D
J�.δ:�e����v�#�(�Θ�Z�nD!��
��o,�lk�UȫH��~���8�S~ϴ�s�Z�<ۆ��־m����W��-zGmj�
o���z�o}1g+<�;�����7F�Y-�(�?��!�%V.hCQ����A�RgN�5g(�1�!bю�$鄁Q�pݒs}���a#8��� �[�u�`�-K���6���ʳ�)��F�)B�	f��7��0���R�,4Q8um`��}ʠ�ĔT<�w�ZG6�3��n�"2=z�VA��a8 �1����V�m�Y�$�>�AM�nT��|���&�o>V"�y`���GI?:�DT}Ό~|�1�ÆS�_Ac?5�XOQ'?%^�(�������)�{���5@�:���G�A*�	�\���Ç��G���F�mP}��F�����̞���[.�| �H��"9m��j���,.��uQ���֎��J~��,뿖3~      �   >   x�M��� ����]s$���H|GCvr9�`9?�Ӗ�\���=�=UPM���D/�      �   6   x�=ɱ  ��&�����P�t�&��������B	)���}y��iJ
      �   Q   x�3��tu�q���S��/V(,MU()JLJ�J�SH�,JM.I�M�+IUHT�IT((�O)MNΌ��H3������ w��      �   R   x�3�t�p���O�J-ɬJ,R��W�p��9�S�r3�3��R��9ÀܜԬ�b=��T�������������W� ,�U      �   I   x����/�O/JL�L�4250��t�,N=�1����54�N-*�L��/V��KO��L-�/�41 J��qqq �;�      �      x������ � �      �   6  x�m�MN�0���)| �'���
!��hŊ�șF�R;��H=K,P���a����;��{�7E)��6k�5�):`�mk�aۡ�d���<+��nP{+�×6�mM�#���� T���e򅰱r#���Q(�����¶AӰ5;%:���*��������&4~W-	���W�+����؃�p��������F��]���P�ď�ܳur�ܓ�xJA���'"㈨\̜��n�Y��P5�+�1�@{�M�8�e�VgO�zh��?ZuQ|\�e�Z)q�X"L�&��A=߭�v#�����U��v�e�/
��J      �   g   x�3�t�Sp�ruu�<<ُӵ�$U��(�25�$_!����B��<����T��T�Ԭ�����Û�L�:�\�9]*\�R���8���]���=... h3#6      �      x�3����� h �      �      x������ � �      �      x������ � �      �   �   x�e�;n1k�{�`��vu #p�H�ʍ���a$@`�?W�����©Nu�����W�3�"�1������b�
����m�;|�O�+PA*c�"�C�	��T��#�!Υm�L�)؜�Ⱦ�������vvf
V�������m��ڭ�/�6g��n)��]:G^P���ѭWݑ�-����z�s�ܜ�����<�۷X�����\�      �      x������ � �      �      x������ � �      �   J  x��V�n�8]�_�e�E=�t2N�"�1�d7Z�=,$Ѡ$�����'���\���Nt�yν�>S&�B��q⳱��tV[~���j���%�Ɵ��|����'�)7��ޖ�U�+�!؝=���y�f~��^��B�H�&ڭLfl�G�B�F;<*����r�]el	��'>,�@S|�p֔����Q9�0w��)�.a�[)��ė�*����$ԓ#>��lY;���B��)��
��n�N�9|�&��P.��It�����fC/X���\�^>� �V$q,�ً�4v���R�#��U�f���*|��}iV������V�-����{��}��9�O�~#��`t3x�y}�$)��DD�Y��fe+
�I �(��E�7b�o�D&�o@�ϓ�}��ȋ���ivz��3U8�z$�"�\�$�R@U�p�P\-�ɚ�n�7E� =i���������Eaҏ<���{�,��)h�dL"`z��ƛg���v[=���O��Q��Q��ޥ�T1��O�Ry��x����,�$�ѥ�Sx�e�~ �0�lJ��)QgJH��٩���ź;���$������F��p0fq$������Mv�D`�"6�g�S���)����.-�e�`�UL=c��F�e�������ME_zi|�f�%;J?��*IF;�O ~�\������։�u"� ���G��˭��ީ�<i�zu�����˽OCYC�^&����A�kYC��Si|��3�k�Li䡿�,X��)Ć�1UR�k��I=-�:��\o�]l�^"BϏ��ك�!�6�}�^(B����_K���j�h#�d��򥂚>�)��%1�%����U�Y�� N:䭩A�Y~����%^�;M吚V�a��K=?�Y'V��V�n��u��=�-}k0�3k����N��0kk�Rv������Md�B��d��h�zBX�:��m����_Ç����H*��U��� Q;Pn7pK8���C�M�r��#}��]�c�CJJ"S%�=��0���f_�_��'���{	�Ѓ6U	�rM�A���Mb��|���k����6�a)��4�P��`r�R��俽^��?�Sӟ      �   ]   x�3�LL����t���%E�)�E\F�E���y�A *��˘3˱(5��Dr�p&%f�s���\�����y��������~����\1z\\\ �� �      �      x������ � �      �     x���Kn�0���)x�Q��j8��$5�v�-SYt)Y@z�.�,z_�CJ��u����73��3�1AHH�"�(!$ =�{k�U��Qت})�FɝVU�S)kl�V֨@1Jg�"�(PL�87ʪ���>���3��
3��� 
�2B\3"��dHB�V���e�U�V���)�kY��=�@)��r� �u0rƨ� 5~���q��@�g�#qy�(�+(]:���L�l����8�k	'�z���
��(;ʭ�Փ�_�ZV�fN�ȟe)�%�8NNНjA�A��fo���R0��δzlCY��w�C�%Q���X��O��&-��Uf'(��$�; �%�,ó� 1�#�7�t䵪T��_j�ӥ�M8��r`!PBR$Z�r�mo��Dby�e:�w^~ �͂���z`贋����=P_ޔ�:Uy�-f��v��x�'"��{9��Z,�(~g���sSՍ=�C�{h)��w!��Y���	�!���Z�&�!��k��V���:y.��,�1$|3r4���T�8��q�U~��޸^@��՚q�Aȑ##��&�^A����*7#*��b�������J��5�5x�����FA�#?���J��}�$�j�l�.������N\�@�{�[}UK�(1욾;�N�JwV�48���n�?J��ۍP�Gw��nu9���I�����7���˲#OV�մ��IA�t�-1׍�8&*&*Ћ�zu#�.e[k4�
��{�D�n
B� R�[���]���k0��� ;�H!      �   _  x�]�Kr!C��aR��%�?G���!K^ɲl�R�x�����Jl��e�o�0Mm��I�l�1�Oj[��c�V4%���{,�p��EA�(g�PO�|�S�hB�oh4M�U �HZ7Ih�Kg���'�vUa԰{H���W�MR�F�fi �>5h=N��خc�$�5��O�+�&�;˓��^gM��:���=fr�N�b�� �=f^>��3����
�<	.����#��������Ix��|����<��χ���rp.^_��"y:���}e��(�/�i�D��%>s��}�{&�����M��y��9����'�C��=灟������0�����q      �   �  x�u�An�0E��S��Hʶ�tc�Ek���(���"Y���m�̢�A먖p!��?��?�2X����}�l�����*�m��iZ�J!���GK���a;��п�)����N`]4HE����>!Q����F���Ђ��6�������#�.��Im����t����i-����iS��}�ڒ��%ґ�r
.衙4=�fB��%V�[xW�UCCW���3�X�M�Z��?�	X=�=�� r3���ܽ�{A��	� ���eѿD�	�������8�\������ ��	pK͐U��w�|<)�D�n�*��"�W�(�x ,p
�d�0	{�\��ђd��J�����ƫ�F��qQ��;[���A\ jD�0�W���uEa9�=���]eRaO�S+y�%l_�%��0�(�	�����]c}m�ܻ���f�x�\��B�|�ۃ      �     x�}�˖�H���S88c���Z��Mיw4 f�(=�Aj�#䋵V��:'�Q@��~vl� �<.�Y68��˸�1�lP�u\?�=����nzqd9�8<*�~�)��.@<�o\r��8�vӲ3�<o�/�����	�qҐ��Ƞ!h���E"�Q������1d`���p�aબ�+1�Z
Y�NZ�9�a����/y�۴
��J9�x׌ۅ7�͑X����$o)�ynI�{Z"`PeV�=���H�'���� ��p��iVա����[~z�:�Uֶ�zy�HȪ���*L���=3$n�K\ �^�Kķ�_1ğ%�)$k.�-v�ȴGO����`��'R��֬��d�X�D�v��JO��o6�#hߗ��h_yBXl���H��2�I�R!�kp�f���S��!M���Q��OF�~jg��<��&���A���G��7�29��]�w�N�H�?'���0tB�آ�w5%�^�l��o��þ=g����la3��:�k�CW��q�x�k�׻St�Vף*���ܵl�g��=�q�e�[���1��������_ZKX����f{:�S�m�&[����Ԗ�q��5���4��)�a?��o���ޗv��sH(6�MXn[��Üv��D�ʈf���X�_NOL�G���'|d*���\�Kݩ��Տ��f�ñ�jɛ��P�R�Δ���S��"!9��W$��!&�ᡫhMh��]ó��h�N��܊O{u�J��6����@&R����3����_�_6S]j$�5q~2D
ؠ�@����¸X���Ǳߦ��4�j���\��>���ė8�	�>��<�O�b�"&�(�{�����dL%�<��HQs�8�{a��+m#Z����d��!*ibW��Ϗ� �3	Lf#cY�4KVqE"�P��\Op�����'�V�:G��?X�ˤ�~K��*ku]�Cg،�C���A����9ך�~�d_b�޸V�'̃�T�'\v0�o��U��>	.��U�d\(1)�V��~�~�M��}��b���������?w#>�@��������(dQȀG.D�5N���mF�D�o����p�����S�c>qO����W�D[�G$�dQ�I���ʷ&�ɩ�S�ks���e�Z�id}H��}�|�*����mGgz����H���Ԑ�ʇ\�"�����k�:�'�J�({U�ʮp�F|*���e�f��~rrY�g�ϩ��leO֖:\kJ9U��!�ш�(�hQ�ǪG}1-�j���_�Ͼ�������ӫ�     