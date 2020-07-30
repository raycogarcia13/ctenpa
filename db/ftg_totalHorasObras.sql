-- FUNCTION: public.ftg_totalhorasobras()

--DROP FUNCTION public.ftg_totalhorasobras() CASCADE;

CREATE FUNCTION public.ftg_totalhorasobras()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
declare tmp integer :=0 ;

BEGIN
	select id into tmp from cierre_proyectista where anno=new.anno AND mes=new.mes AND "SubProyectoId"=new."SubProyectoId";
	
	IF tmp!=0 then
	
		UPDATE public.cierre_proyectista
			SET  acumulado_obras=acumulado_obras+ new.tiempo
			WHERE id=tmp;
		
	ELSE 
		INSERT INTO public.cierre_proyectista(
			id, anno, mes, acumulado_obras, "SubProyectoId", "TrabajadorId")
			VALUES (default, new.anno, new.mes, new.tiempo, new."SubProyectoId", new."TrabajadorId");
	END If;
	RETURN new;
END;
$BODY$;

ALTER FUNCTION public.ftg_totalhorasobras()
    OWNER TO postgres;
