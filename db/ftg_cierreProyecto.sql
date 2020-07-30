 --DROP TRIGGER "tg_cierreProyecto" ON public.cierre_proyectista;

DROP FUNCTION public.ftg_cierreProyecto();

CREATE FUNCTION public.ftg_cierreProyecto()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
declare tmp integer :=0 ;
declare tmp1 integer :=0 ;

BEGIN
    select "ProyectoId" into tmp1 from sub_proyecto where id=new."SubProyectoId";
	raise notice '%',tmp1;
	select id into tmp from cierre_proyecto where anno=new.anno AND mes=new.mes AND "ProyectoId"=tmp1;
	raise notice '%',tmp;
	IF tmp!=0 then	
		UPDATE public.cierre_proyecto
			SET  horas_acumuladas=horas_acumuladas+ new.acumulado_obras
			WHERE id=tmp;
		
	ELSE 
		INSERT INTO public.cierre_proyecto(
			id, mes, anno, horas_acumuladas, produccion_bruta, produccion_mercantil, produccion_cuc, "ProyectoId")
			VALUES (default,new.mes, new.anno, new.acumulado_obras,0,0,0, tmp1);
	END If;
	RETURN new;
END;
$BODY$;

ALTER FUNCTION public.ftg_cierreProyecto()
    OWNER TO postgres;


-- DROP TRIGGER "tg_cierreProyecto" ON public.cierre_proyectista;

CREATE TRIGGER "tg_cierreProyecto"
    AFTER INSERT OR UPDATE OF acumulado_obras
    ON public.cierre_proyectista
    FOR EACH ROW
    EXECUTE PROCEDURE public.ftg_cierreproyecto();
