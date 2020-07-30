DROP TRIGGER tg_calculoprod_acumulada ON public.cierre;
DROP FUNCTION public.ftg_calculoprod_acumulada();
CREATE FUNCTION public.ftg_calculoprod_acumulada()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
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
$BODY$;



CREATE TRIGGER tg_calculoprod_acumulada
    AFTER UPDATE OF produccion_mercantil
    ON public.cierre
    FOR EACH ROW
    EXECUTE PROCEDURE public.ftg_calculoprod_acumulada();