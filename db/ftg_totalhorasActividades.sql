-- FUNCTION: public.ftg_totalhorasactividades()

 DROP  FUNCTION public.ftg_totalhorasactividades() CASCADE;

CREATE FUNCTION public.ftg_totalhorasactividades()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
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
$BODY$;

ALTER FUNCTION public.ftg_totalhorasactividades()
    OWNER TO postgres;
