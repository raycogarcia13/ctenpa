-- FUNCTION: public.f_cierreproyectomio()

-- DROP FUNCTION public.f_cierreproyectomio();

CREATE OR REPLACE FUNCTION public.f_cierreproyectomio(
	)
    RETURNS TABLE(proyectid integer, codigo character varying, nombrep character varying, nombret text, acumulado double precision, produccionb numeric, produccionm numeric, produccionc numeric, mes integer, anno integer, id integer) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
    
AS $BODY$  
declare cant integer :=5;
	BEGIN	
	RETURN QUERY SELECT  proyectos.id as proyectId, 
	proyectos.codigo,proyectos.nombre, 
	trabajador.nombre||' '||trabajador.apellidos,
	acumulado_obras + (SELECT acumulado_actividades
	FROM public.cierre_actividadesproductivas
	where "TrabajadorId"=trabajador.id),
	cierre_proyecto.produccion_bruta,
	cierre_proyecto.produccion_mercantil,
	cierre_proyecto.produccion_cuc,
	cierre_proyecto.mes,
	cierre_proyecto.anno,
	cierre_proyecto.id 
	
	FROM public.cierre_proyectista  inner join trabajador on cierre_proyectista."TrabajadorId"=trabajador.id
	inner join sub_proyecto on cierre_proyectista."SubProyectoId"=sub_proyecto.id
	inner join proyectos on sub_proyecto."ProyectoId"=proyectos.id inner join cierre_proyecto on  proyectos.id=cierre_proyecto."ProyectoId"
	ORDER by "TrabajadorId";
	
	END; 
	$BODY$;

ALTER FUNCTION public.f_cierreproyectomio()
    OWNER TO postgres;
