-- FUNCTION: public.ftg_cierreproyecto()
--DROP TRIGGER "tg_cierreProyecto" ON public.cierre_proyectista;
--DROP FUNCTION public.ftg_cierreproyecto();

CREATE FUNCTION public.ftg_cierreproyectista()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
declare tmp integer :=0 ;

BEGIN
   
	select id into tmp from cierre_proyectista 
		where anno=new.anno AND mes=new.mes 
		AND "SubProyectoId"=new."SubProyectoId" 
		AND "TrabajadorId"=new."TrabajadorId";	
		
	IF TG_OP = 'INSERT' then
		IF tmp!=0 then	
			UPDATE public.cierre_proyectista
				SET  acumulado_obras=acumulado_obras + new.acumulado_obras
				WHERE id=tmp;		
		ELSE 
			INSERT INTO public.cierre_proyectista(
				id, anno, mes, acumulado_obras, "SubProyectoId", "TrabajadorId")
				VALUES (default,new.anno, new.mes, new.acumulado_obras,new."SubProyectoId",new."TrabajadorId");
		END If;
	ELSE 
		UPDATE public.cierre_proyectista
			SET  acumulado_obras=acumulado_obras + (new.acumulado_obras - old.acumulado_obras)
			WHERE id=tmp;
	END IF;

	RETURN new;
END;
$BODY$;

ALTER FUNCTION public.ftg_cierreproyectista()
    OWNER TO postgres;

