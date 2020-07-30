-- FUNCTION: public.calculosuma(integer, integer, integer)

-- DROP FUNCTION public.calculosuma(integer, integer, integer);

CREATE OR REPLACE FUNCTION public.calculosuma(
	idt integer,
	mesa integer,
	annoa integer)
    RETURNS real
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
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
$BODY$;

ALTER FUNCTION public.calculosuma(integer, integer, integer)
    OWNER TO postgres;
