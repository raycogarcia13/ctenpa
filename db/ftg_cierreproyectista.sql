DROP TRIGGER tg_cierreproyectista ON public.control_obra;
DROP FUNCTION public.ftg_cierreproyectista();
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
$BODY$;

ALTER FUNCTION public.ftg_cierreproyectista()
    OWNER TO postgres;



CREATE TRIGGER tg_cierreproyectista
    AFTER INSERT OR UPDATE OF tiempo
    ON public.control_obra
    FOR EACH ROW
    EXECUTE PROCEDURE public.ftg_cierreproyectista();
