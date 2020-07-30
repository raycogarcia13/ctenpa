-- FUNCTION: public.f_cierreproyecto()

-- DROP FUNCTION public.f_cierreproyecto();

CREATE OR REPLACE FUNCTION public.f_cierreproyectoMio(
	)
   RETURNS TABLE (codigo character varying,
	nombrep character varying,
	nombret text,
	acumulado double precision,
	produccionb numeric(10,2),
	produccionm numeric(10,2),
	produccionc numeric(10,2),
	mes integer,
	anno integer,
	id integer) AS
$func$  
	BEGIN	
	RETURN QUERY SELECT  proyectos.codigo,proyectos.nombre, trabajador.nombre||' '||trabajador.apellidos, acumulado_obras,cierre_proyecto.produccion_bruta,cierre_proyecto.produccion_mercantil,cierre_proyecto.produccion_cuc,cierre_proyecto.mes,cierre_proyecto.anno,cierre_proyecto.id 
	
	FROM public.cierre_proyectista  inner join trabajador on cierre_proyectista."TrabajadorId"=trabajador.id
	inner join sub_proyecto on cierre_proyectista."SubProyectoId"=sub_proyecto.id
	inner join proyectos on sub_proyecto."ProyectoId"=proyectos.id inner join cierre_proyecto on  proyectos.id=cierre_proyecto."ProyectoId";
	--group by proyectos.codigo,proyectos.nombre, trabajador.nombre||' '||trabajador.apellidos, acumulado_obras,cierre_proyecto.produccion_bruta,cierre_proyecto.produccion_mercantil,cierre_proyecto.produccion_cuc,cierre_proyecto.mes,cierre_proyecto.anno,cierre_proyecto.id;
	
	END; 
	$func$  LANGUAGE plpgsql;
	

ALTER FUNCTION public.f_cierreproyectoMio()
    OWNER TO postgres;
