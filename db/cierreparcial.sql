--DROP FUNCTION public.cierreparcial();
CREATE OR REPLACE FUNCTION public.cierreparcial()
	  RETURNS table (tiempo double precision,
	subpid integer,
	trabid integer,
	anno integer,
	mes integer,
	codigo character varying,
	nombre character varying,
	trabajador character varying,
	usuid integer)
     AS $BODY$
BEGIN
	
	RETURN QUERY SELECT
	cierre_proyectista.acumulado_obras,
	cierre_proyectista."SubProyectoId",
	cierre_proyectista."TrabajadorId",
	cierre_proyectista.anno,
	cierre_proyectista.mes,
	sub_proyecto.codigo,
	proyectos.nombre,
	trabajador.nombre || trabajador.apellidos AS trabajador,
	trabajador."UsuarioId" 
FROM
	sub_proyecto
	INNER JOIN proyectos ON sub_proyecto."ProyectoId" = proyectos."id"
	INNER JOIN cierre_proyectista ON cierre_proyectista."SubProyectoId" = sub_proyecto."id"
	INNER JOIN trabajador ON cierre_proyectista."TrabajadorId" = trabajador."id" 
WHERE
	cierre_proyectista.anno = 2020 
	AND cierre_proyectista.mes = 7 
GROUP BY
	sub_proyecto.codigo,
	cierre_proyectista."SubProyectoId",
	cierre_proyectista."TrabajadorId",
	cierre_proyectista.anno,
	cierre_proyectista.mes,
	cierre_proyectista.acumulado_obras,
	proyectos.nombre,
	trabajador.nombre,
	trabajador.apellidos,
	trabajador."UsuarioId";
 
END;
$BODY$
LANGUAGE 'plpgsql';

